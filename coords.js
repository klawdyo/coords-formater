function pr( e ){ console.log(e); }
/*
 * Biblioteca que converte campos html em campos específicos para armazenar,
 * formatar e exibir latitudes e longitudes.
 *
 *
 *
 *
 */
var coords = {
    /************************************************************
     *
     *  BASICS
     *
     ************************************************************/

    /*
     * init()
     * Inicia a biblioteca a partir de um seletor jquery
     *
     * @version 0.1 21/01/2017 Initial
     *          0.2 22/01/2017 Removido jQuery
     *
     * @example
     *
     *
     * @param string strSelector Seletor que leve a um input que receberá a transformação
     * @param object options
     * @return
     */
    init: function( strSelector, options ){
        var $obj = this;
        var newOptions = this.options( options );

        //Loop pelos elementos do seletor
        // jQuery( strSelector ).each( function( i , el ){
        //     $obj.makeAllEverythingAndOthers( jQuery( el ) , newOptions )
        // } );

        document.querySelectorAll( strSelector ).forEach( function( objInput ){
            $obj.makeAllEverythingAndOthers( objInput );
        } );

        //Return object
        return this;
    },

    /************************************************************
     *
     *  DOM HANDLE
     *
     ************************************************************/
    /*
     * makeAllEverythingAndOthers()
     * Recebe um objeto individual e faz a transformação nele
     * - os campos + e - e as direções NEWS, serão colocadas com campos select
     * - precisa gerar uma nova class informando o formato que está sendo usado
     * -
     * @version 0.1 21/01/2017 Initial
     *          0.2 22/01/2017 Removido jquery
     *          0.3 23/01/2017 Removido o parâmetro options. O método recebe
     *                         direto da propriedade da classe.
     *
     * @example
     *
     * @param objInput
     * @return
     */
    makeAllEverythingAndOthers: function( objInput ){
        var options = this.initialOptions;
        //Esconde o input principal
        objInput.style.display = 'none';

        var inputName = objInput.getAttribute('name');
        var showIconClass = this.options.showIcon ? 'coords-show-icon-map' : '';

        //Criando o container
        var objContainer = document.createElement('DIV');
        objContainer.className = 'coords-container '+ showIconClass +' ';
        objInput.parentNode.insertBefore(objContainer, objInput.nextSibling);

        //Verifica se deve exibir o sinal à esquerda
        if( options.showSign == true ){
            this.createSelect( objContainer, inputName, 'signal', ['', '+', '-' ] );
        }

        // Verifica as opções e cria os demais inputs
        //Sempre exibido
        this.createElement( objContainer, inputName, 'degrees', options.degreeIndicator )

        //Exibindo quando minutes=true e quando seconds também for
        if( options.minutes == true || options.seconds == true ){
            this.createElement( objContainer, inputName, 'minutes', options.minuteIndicator )
        }

        if( options.seconds == true ){
            this.createElement( objContainer, inputName, 'seconds', options.secondIndicator )
        }

        //Verifica se deve exibir o sinal à esquerda
        if( options.showCompassDirection == true ){
            this.createSelect( objContainer, inputName, 'compass', ['', 'E', 'N', 'S', 'W' ] );
        }


    },

    /*
     * Cria os elementos com javascript puro
     *
     *
     * @version 0.1 22/01/2017 Initial
     *
     * @param object objContainer Objeto do container dos campos
     * @param string inputName Nome do input original
     * @param string coordsType Tipo da parte da coordenada
     * @param string indicator Caractere usado como legenda do campo
     * @return void
     */
    createElement : function( objContainer, inputName, coordsType, indicator ){
        var input = document.createElement( 'INPUT' );
        input.setAttribute( 'type', 'text');
        input.setAttribute( 'data-coords-type', coordsType );
        input.setAttribute( 'name', inputName + '_coords_' + coordsType );
        input.setAttribute( 'class', 'coords-input coords-' + coordsType );

        objContainer.appendChild( input );
        this.eventsHandler( input );

        var span = document.createElement( 'SPAN' );
        //<span class="coords-indicator coords-degrees">\°</span>
        span.setAttribute( 'class', 'coords-indicator coords-' + coordsType );
        span.innerHTML = indicator;
        objContainer.appendChild( span );
    },


    /*
     * Cria os elementos com javascript puro
     *
     *
     * @version 0.1 23/01/2017 Initial
     *
     * @param object objContainer Objeto do container dos campos
     * @param string inputName Nome do input original
     * @param string selectType Tipo do select: 'sign' ou 'directions'
     * @param array data Array com os dados do select: [ 'N', 'E', 'W', 'S' ]
     * @return void
     */
    createSelect : function( objContainer, inputName, selectType, data ){
        var select = document.createElement( 'SELECT' );
        select.setAttribute( 'name', inputName + '_' + selectType );
        select.setAttribute( 'class', 'coords-select coords-' + selectType );
        select.setAttribute( 'data-coords-type', selectType );

        objContainer.appendChild( select );


        for(var i = 0; i < data.length; i++) {
            //pr(i)
            var opt       = document.createElement('option');
            opt.innerHTML = data[i];
            opt.value     = data[i];
            select.appendChild(opt);
        }


        //this.eventsHandler( select );
    },

    /*
     * Adiciona valores a todos os campos de uma vez. Usado em onPaste e ao carregar
     * a biblioteca com um valor predefinido
     *
     * @version 0.1 23/01/2017 Initial
     *
     * @param object $objContainer Objeto do container dos campos
     * @param string strCoord
     * @return void
     */
    batchValues : function( $objContainer, strCoord ){
        var parse    = this.parse( strCoord );
        if( parse.length < 6 ) return false;
        pr(parse)
        pr(this.initialOptions.decimalPlaces)
        var children = $objContainer.children;

        for( i = 0; i < children.length; i++ ){

            switch( children[i].getAttribute( 'data-coords-type' ) ){
                case 'signal'  :
                    children[i].value = parse.signal;
                    break;
                case 'compass' :
                    children[i].value = parse.compass;
                    break;
                case 'degrees' :
                    children[i].value = Number.isInteger( parse.degrees ) === true ? parse.degrees : parse.degrees.toFixed( this.initialOptions.decimalPlaces );
                    break;
                case 'minutes' :
                    children[i].value = Number.isInteger( parse.minutes ) === true ? parse.minutes : parse.minutes.toFixed( this.initialOptions.decimalPlaces );
                    break;
                case 'seconds' :
                    children[i].value = Number.isInteger( parse.seconds ) === true ? parse.seconds : parse.seconds.toFixed( this.initialOptions.decimalPlaces );
                    break;
            }

        }

        return true;
    },

    /************************************************************
     *
     *  EVENTS HANDLER
     *  Gerencia os eventos dos campos criados
     *
     ************************************************************/
    /*
     * Gera os eventos
     *
     * @version 0.1 22/01/2017 Initial
     *
     *** Eventos
     * @todo
     * - aumenta o tamanho dos campos de acordo com os caracteres
     * - verifica se os minutos ou segundos são maiores que 60
     * - verifica se os graus são maiores que 180 (long), Lat vão até 90 (http://www.geomidpoint.com/latlon.html)
     *   converte para o formato definido
     * - verifica ao copiar um dos valores qual o formato definido e copia
     *   para a área de transferência o valor formatado
     * - [OK] verifica ao colar um valor em qualquer campo e auto preenche os demais caso seja uma coordenda válida.
     * - [OK] seleciona todo o conteúdo ao entrar no campo
     * - ao atualizar os campos, atualizar o valor do input oculto que será enviado
     * - verificar se fica melhor usar campos P editáveis ao invés de novos campos de formulário. Os campos P ficariam melhor do que usar JavaScript pra ficar aumentando e diminuindo o tamanho dos input.
     *
     * @param object objInput Campo que receberá o evento
     * @return void
     */
    eventsHandler : function( objInput ){
        var $this = this;

        //Manipula o código ao colar o resultado
        objInput.addEventListener( 'paste', function( evnt ){   $this.onPaste(   evnt, $this ) } );
        //Manipula o código que seleciona todo o texto ao entrar
        objInput.addEventListener( 'focus', function( evnt ){   $this.onFocus(   evnt, $this ) } );
        //Manipula o código ao digitar uma tecla
        objInput.addEventListener( 'keydown', function( evnt ){ $this.onKeyDown( evnt, $this ) } );
        //@todo
        //Evento que gerencia o tamanho dos campos ao digitar, ao colar um texto, ao apagar
    },

    /*
     * Recalcula o tamanho dos campos, sendo 8px para cada caractere
     *
     * @version 0.1 23/01/2017 Initial
     *
     */
    calculateWidths : function( evnt ){
        if( this.initialOptions.recalculateWidth !== true ) return;
        pixelsBychars = this.initialOptions.pixelsBychars || 8;

        var parentWidth   = evnt.target.parentNode.style.width;
        var children = evnt.target.parentNode.children;
        var size = 10;
        //   W120.8362
        for( i = 0; i < children.length; i++ ){
            if( children[i].getAttribute( 'class' ).search( 'coords-input' )  !== -1 ){
                children[i].style.width = ( ( children[i].value.length + 1 ) * pixelsBychars )  + 'px' ;
            }
            else if(children[i].getAttribute( 'class' ).search( 'coords-select' )  !== -1 ){
                children[i].style.width = '35px';
            }
        }


    },


    /*
     * onKeyDown()
     * Ao pressionar uma tecla
     *
     * @version 0.1 22/01/2017 Initial
     *          0.2 23/01/2017 Adicionado o objeto da classe como parâmetro

     *
     * @param object evnt Objeto do evento
     * @param object $this Objeto da classe
     * @return void
     *
     */
    onKeyDown : function( evnt, $this ){
        if( evnt.target.tagName == 'INPUT' ){
            $this.calculateWidths( evnt );
        }
    },

    /*
     * onFocus()
     * Seleciona todo o texto ao entrar no campo
     *
     * @version 0.1 22/01/2017 Initial
     *          0.2 23/01/2017 Adicionado o objeto da classe como parâmetro
     *
     * @param object evnt Objeto do evento
     * @param object $this Objeto da classe
     * @return void
     *
     */
    onFocus : function( evnt, $this ){
        evnt.stopPropagation();
        evnt.preventDefault();

        if( evnt.target.tagName == 'INPUT' ){
            evnt.target.select();
        }
    },

    /*
     * onPaste()
     * Gerencia o que acontece quando colamos um valor dentro dos campos
     * - Lê o valor, normaliza, dá um parse e separa os componentes nos
     *   campos de acordo com o formato desejado.
     *
     * @todo O valor colado precisa de adequar ao padrão que está definido.
     *       Precisa verificar quais os campos para definir o padrão e fazer
     *       o arredondamento correto, pois se, por exemplo, não existir o
     *       campo dos segundos, então os minutos devem ser formatado como
     *       float para receber a rebarba dos segundos
     *
     *
     * @version 0.1 22/01/2017 Initial
     *
     * @param object evnt Objeto do evento
     * @return void
     */
    onPaste : function( evnt, $this ){
        var clipboardData, pastedData;
        //pr(obj)
        // Stop data actually being pasted into div
        evnt.stopPropagation();
        evnt.preventDefault();

        // Get pasted data via clipboard API
        clipboardData = evnt.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('Text');



        if( $this.batchValues( evnt.target.parentNode, pastedData ) === false ){
            alert( 'O texto \n\n'+  pastedData +'\n\nNão é uma coordenada válida' )
        }

        //Elementos da coordenada
        // pr(parse);
        // //Se a coordenada não for reconhecida, exiba a mensagem de erro e encerre
        // //Filhos do container
        // var children  = evnt.target.parentNode.children;
        // //Loop pelos filhos do container
        // for ( i = 0; i < children.length; i++ ){
        //     if( children[i].tagName == 'INPUT' || children[i].tagName == 'SELECT' ){
        //         switch( children[i].getAttribute( 'data-coords-type' ) ){
        //             case 'signal'  : children[i].value = parse.signal;  break;
        //             case 'compass' : children[i].value = parse.compass; break;
        //             case 'degrees' : children[i].value = parse.degrees; break;
        //             case 'minutes' : children[i].value = parse.minutes; break;
        //             case 'seconds' : children[i].value = parse.seconds; break;
        //         }
        //     }
        // }

        //Recalcula os tamanhos
        $this.calculateWidths( evnt );
    },

    /************************************************************
    *
    * MATH AND PATTERNS
    * Handles calculus and formats to add support into others functions
    *
    ************************************************************/

    /*
     * @var
     * Opções gerais, usado para exibição dos inputs e para conversão entre formatos
     */
    initialOptions : {
        'spaces'                : true,  //Spaces between parts
        'degrees'               : true,  //Show degrees. Always true
        'minutes'               : true,  //Show minutes.
        'seconds'               : true,  //Show seconds. False if minutes is false too
        'degreeIndicator'       : '°',   //Degree component indicator
        'minuteIndicator'       : "'",   //Minute component indicator
        'secondIndicator'       : '"',   //Second component indicator
        'showSign'              : false, //Configure to show sign at start
        'showCompassDirection'  : true,  //Configure to show compass direction at end
        'decimalSeparator'      : '.',   //Last component's decimal separator
        //@todo: permitir renomear as direções exibidas
        //'compassDirections'     : { 'north': 'N', 'east': 'E', 'west': 'W', 'south':'S' }, //change compass directions at exibition
        //@todo: Exibir um ícone à direita do campo que permita abrir uma popup e selecionar a localização no mapa
        //'showIcon'              : false, //Show 'openMap' icon at right of input
        //[OK]@todo: Arredondar o último componente para um número de casas definido
        'decimalPlaces'         : 5,

        //Recalculate widths
        recalculateWidth       : true,
        pixelsBychars          : 8,
    },

    /*
     * Mescla as opções de acordo com as regras definidas para evitar distorções.
     * * Regras
     * - degree é sempre true;
     * - minute é true caso seconds também o seja
     * @version 0.1 22/01/2017 Initial
     *          0.2 23/01/2017 Mescla as opções definidas dentro das originais
     *
     * @param object options Opções que serão mescladas com as opções iniciais
     * @return
     */
    options : function( options ){
        if ( typeof options == 'undefined' ) return this.initialOptions;
        //basic rules
        //degrees is always true
        options.degrees = true;
        //seconds is false if minutes is false too
        if ( options.minutes == false ) options.seconds = false;
        //return
        return this.initialOptions = Object.assign( {}, this.initialOptions, options );
    },

    /*
     * normalize
     * Tenta deixar a expressão em um formato padronizado
     * - Remove espaços duplicados
     * - Substitui ' ʹ ʼ ˈ ́  ׳ ′ꞌ  por '
     * - Substitui '' por "
     * - Substitui " „ “ ” por "
     * - Substitui ° ˚ ̊  ⁰ ∘ ◦ ॰ o por °
     * - Substitui , por .
     *
     * @version 0.1 21/01/2017 Initial
     *
     * Fonte dos caracteres: http://www.fileformat.info/info/unicode/char/00b0/index.htm
     *
     * @todo: substituir os caracteres pelos seus correspondentes no unicode
     *        http://www.w3schools.com/jsref/jsref_regexp_unicode_hex.asp
     * @param string strCoord Texto com a coordenada em qualquer valor
     * @return String Coordenadas formatadas
     */
    normalize : function( strCoord ){
        //strCoord = strCoord
                //.replace(/(\xb0|\x2da|\x30a|\x2070|\x2218|\x25e6|\x970|\x6f)/g, '°')     // ° ˚ ̊  ⁰ ∘ ◦ ॰ º o
                //.replace(/[\xb0\x2da\x30a\x2070\x2218\x25e6\x970\xba\x6f]/g, '°')     // ° ˚ ̊  ⁰ ∘ ◦ ॰  º o
                // .replace(/[\x27\x2b9\x2bc\x2c8\x301\x5f3\x2032\xa78c]/g, "'") // ' ʹ ʼ ˈ ́  ׳ ′ꞌ
                // .replace(/[\x22\x201e\x201c\x201d]/g, '"') //  " „ “ ”

                // pr('1) '+strCoord)
                strCoord = strCoord.replace(/\s{2,}/g, " ") //Remove espaços duplos
                // pr('2) '+strCoord)
                strCoord = strCoord.replace(/[°˚⁰∘◦॰ºo]+/g, '°')
                // pr('3) '+strCoord)
                strCoord = strCoord.replace(/['ʹʼˈ׳′ꞌ]{1}/g, "'")
                // pr('4) '+strCoord)
                strCoord = strCoord.replace("''", '"') //two double quotes
                // pr('5) '+strCoord)
                strCoord = strCoord.replace(/["„“”]+/g, '"')
                // pr('6) '+strCoord)
                strCoord = strCoord.replace(/\,+/g, '.') //transformando vírgulas em pontos
                // pr('7) '+strCoord)
        return strCoord;
    },

    /*
     * parse()
     * Pega os componentes da coordenada
     *
     * @version 0.1 21/01/2017 Initial
     *          0.2 23/01/2017 Parse agora converte todos os valores para DMS,
     *                         independentemente da entrada.
     *
     *
     *
     * @param strCoord
     * @return
     */
    parse : function( strCoord ){
        //Iniciando o parsing normalizado
        strCoord = this.normalize( strCoord );

        //V0.1
        //var pattern = /([NEWS]{1}|[-+]{1})?([0-9,\.]+°)([0-9,\.]+')?([0-9,\.]+")?([NEWS]{1})?/i;
        //V0.2 - 22/01/2017 - Adicionado suporte ao formato "12 24 56"
        var pattern = /([NEWS]{1}|[-+]{1})?\s*([0-9,\.]+\s*°?)\s*([0-9,\.]+\s*'?)?\s*([0-9,\.]+\s*"?)?\s*([NEWS]{1})?/i

        var parts = pattern.exec( strCoord );
        // pr(parts)
        if( parts == null ) return false;

        var compassDirections = ['N', 'E', 'W', 'S'];

        //Só tem como determinar qual a direção se for informada, pois em casos negativos podem
        //tanto ser W como S, assim como o positivo podem ser N e E, dependendo se é latitude ou longitude
        var hasCompass = compassDirections.indexOf( parts[1] ) !== -1 ? parts[1].toUpperCase()  : ( compassDirections.indexOf( parts[5] ) !== -1 ? parts[5] : false )
        var hasSignal  = parts[1] == '-'  || ['S', 'W'].indexOf( hasCompass ) !== -1 ? '-' : '+';

        var degrees    = typeof parts[2] !== 'undefined' ?  parseFloat(parts[2]) : 0;
        var minutes    = typeof parts[3] !== 'undefined' ?  parseFloat(parts[3]) : 0;
        var seconds    = typeof parts[4] !== 'undefined' ?  parseFloat(parts[4]) : 0;

        //se minutos for zero e segundos for zero mas tiver casas decimais nos graus, divida os valores com os menores
        if( minutes === 0 && seconds === 0 && ( degrees !== parseInt( degrees ) ) ){
            minutes = ( degrees - parseInt( degrees )  ) * 60;
            degrees = parseInt( degrees );
        }

        //se segundos for zero mas tiver casas decimais nos minutos, divida os valores com ele
        if( seconds === 0 && ( minutes !== parseInt( minutes ) ) ){
            seconds = ( minutes - parseInt( minutes )  ) * 60;
            minutes = parseInt( minutes )
        }


        return {
            signal  : hasSignal,
            compass : hasCompass,
            degrees : degrees,
            minutes : minutes,
            seconds : seconds,
        };
    },

    /*
     * Converte uma coordenada para float a partir de uma string em qualquer formato
     *
     * @version 0.1 22/01/2017 Initial
     *
     * @param strCoord
     * @return
     */
    stringToDecimal: function( strCoord ){
        return this.convert( strCoord, {
            'degrees'  : true, 'minutes' : false, 'seconds' : false,
            'showSign' : true, 'spaces'  : false, 'degreeIndicator' : '',
            'showCompassDirection' : false
        } );
    },

    /*
     * convert()
     * Converte uma coordenada em float para o formado DD,DDD°
     *
     * @version 0.1 22/01/2017 Initial
     *
     * @example
     *
     * @param strCoord
     * @param options
     * @return
     */
    convert: function( strCoord, options ){
        // newOptions = Object.assign( {} , this.options, options);
        var newOptions = this.options( options );

        var parts = this.parse( strCoord );
        //pr(newOptions);
        // pr(parts);
        if( newOptions.seconds == false ) {
            parts.minutes = parts.minutes + ( parts.seconds / 60 );
            parts.seconds = false;
        }
        // pr(parts)
        if( newOptions.minutes == false ) {
            parts.degrees = parts.degrees + ( parts.minutes / 60 );
            parts.minutes = false;
        }
        var spaces = newOptions.spaces ? ' ' : '';

        return (
          //Exibindo o sinal caso a opção esteja definida
            ( newOptions.showSign  ? parts.signal + spaces : '' )
          //exibindo a parte dos graus junto com a opção do indicador
          + parts.degrees + newOptions.degreeIndicator
        //   //Exibindo a parte dos minutos
          + ( newOptions.minutes == true ? spaces + parts.minutes + newOptions.minuteIndicator : '' )
        //   //Exibindo a parte dos segundos
          + ( newOptions.seconds == true ? spaces + parts.seconds + newOptions.secondIndicator : '' )
        //   //imprimindo a direção da bússola
        + ( newOptions.showCompassDirection && parts.compass ? spaces +  parts.compass  : '' )
        // + ( newOptions.showCompassDirection && parts.compass ? spaces + newOptions.compassDirections.indexOf( parts.compass ) : '' )
        //   //substituindo os pontos e vírgulas pela opção definida
    ).replace( /[,\.]+/g , newOptions.decimalSeparator ).trim();
      //);
    },
};


/*
 * Cria a função do jQuery
 */
if( window.jQuery ){
    jQuery.fn.extend( {
        'coords' : function( options ){
            coords.init( this.selector, options );
            return this;
        },
    } );

    $(function(){
        //Inicia a biblioteca via jQuery
        // $('input[type="coords"]').coords( { minutes: true, seconds: true } );
        //$('input.coords').coords( { minutes: true, seconds: true } );
    });

}
