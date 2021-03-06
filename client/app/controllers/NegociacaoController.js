
class NegociacaoController{

    constructor(){
        const $ = document.querySelector.bind( document );
        const self = this;
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');


        this._negociacoes = new Proxy(new Negociacoes(),	{
            get(target,	prop,	receiver) {
                if(typeof(target[prop]) == typeof(Function) 
                    && ['adiciona', 'esvazia'].includes(prop)){
                        return function(){
                            console.log(`"${prop}" disparou a armadilha`);
                            target[prop].apply(target, arguments);
                            self._negociacoesView.update(target);
                        }
                }else{
                    return target[prop];
                }
            }
        });
        this._negociacoesView = new NegociacoesView( '#negociacoes' );
        this._negociacoesView.update( this._negociacoes );
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemViews('#mensagemView');
        this._mensagemView.update( this._mensagem );
    };


    adiciona( event ){
        //Cancel event 
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada cm sucesso';
        this._mensagemView.update( this._mensagem );
        this._limpaFormulario();
    }

    delete(){
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus;
    }

    _criaNegociacao(){
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }    
}