class mainScene{
    //Roda apenas uma vez, no início
    // É utilizado para carregar os assets do jogo
    preload() { 
        // Armazena a imagem e seu nome
        this.load.image('player', 'assets/player.png'); // Parâmetros: nome da sprite, localização do arquivo
        this.load.image('coin', 'assets/coin.png')
        
        this.load.image('feliz', 'assets/feliz.png')

    }
    //Roda depois do preload 
    // Cria as configurações do que foi criado no preload
    create() {
        // Posiciona a sprite na tela do jogo
        this.player = this.physics.add.sprite(100, 100, 'player'); //Parâmetros: x, y, nome da sprtie
        this.coin = this.physics.add.sprite(300, 300, 'coin');

        // Cria uma variável para score, com valor inicial de 0
        this.score = 0;
        // Cria as confiigurações de estilo
        let style =  {font: '20px Arial', fill: '#fff'};
        this.scoreText = this.add.text(20, 20, 'score: ', + this.score, style);// Posição x, Posição y, texto, style,

        this.anims.create({ // Cria uma animação
            key: 'pegouMoeda', // Define seu nome
            frames: [ // Configura os quadros da animação
                { key: 'feliz'}, // Seus nomes
                { key: 'player'} //
            ],
            frameRate: 1, // frames por segundo
            repeat: 0 // Repetição da animmação
        })
    }

    //Roda 60 vezes por segundo
    // Dá lógica ao jogo, criando comandos, como os de movimento.
    update() {
        this.wasd = this.input.keyboard.addKeys('W,A,S,D') // Cria a variável relativa às teclas wasd
        this.arrow = this.input.keyboard.createCursorKeys() // Cria a variável relativa às teclas de seta, além do ctrl e shift

        // Cria os comandos de movimento. 
        // Basicamente, se a tecla é D clicada, o player move +3px em relação ao eixo x
        if ((this.arrow.right.isDown) || (this.wasd.D.isDown)) {
            this.player.x += 3;
        }
        if ((this.arrow.left.isDown) || (this.wasd.A.isDown)){
            this.player.x -= 3;
        }
        if ((this.arrow.up.isDown) || (this.wasd.W.isDown)) {
            this.player.y -= 3;
        }
        if ((this.arrow.down.isDown) || (this.wasd.S.isDown)) {
            this.player.y += 3;
        }

        if (this.physics.overlap(this.player, this.coin)){
            this.hit();
        }
    }
    hit() {
        this.coin.x = Phaser.Math.Between(100, 600); // Define a pos. x da moeda, com um número entre 100 e 600.
        this.coin.y = Phaser.Math.Between(100, 300); // Define a pos. y da moeda, com um número entre 100 e 300.

        this.score += 1; // Aumenta o score em mais 1

        this.scoreText.setText('score: ' + this.score) // Muda o texto mostrado na tela para o score atual

        // Inicia a animação 
        this.player.play('pegouMoeda')
        // Altera a imagem do player para a imagem 'feliz'
        this.player.setTexture('feliz');
        
    }
}

new Phaser.Game({
    width: 700, // Altura do jogo em pixels
    height: 400, // largura do jogo em pixels
    backgroundColor: '#3498db', // Cor do fundo, no nosso caso, azul
    scene: mainScene, // Nome da cena escolhida
    physics: { default: 'arcade' }, // Engine da física do jogo
    parent: 'game', // Onde o jogo será criado, no nosso caso, a div de id 'game'
})