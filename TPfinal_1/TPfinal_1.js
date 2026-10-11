//Video: https://youtu.be/pHiDN2B2amM

let pantallaActual = 1;
let subestadoPantalla5 = 1;
let subestadoPantalla9 = 1; 

let imagenes = [];
let linterna;
let piernas;
let sirena;
let lluvia;
let afuera;
let luz;
let papel;

let papelReproducido = false;

let caracteresVisibles = 0;
let velocidadTexto = 0.5;


let tiempoMensaje = 0;
let mensajeX = 0;
let mensajeY = 0;

let textoPantalla1 = "Un detective privado venido a menos, consumido por las deudas y el descrédito, recibe una carta anónima a altas horas de la noche.";
let textoPantalla3 = "Luego de una larga busqueda logras encontrar el almacen 10. Te decidis a entrar a ver si lo que decia la carta era cierto. Las luces no funcionan asi que sacas tu linterna y empezas a buscar alguna pista de lo sucedido.";
let textoPantalla5 = "Un cuerpo de un asesinato que pareciera que ocurrio hace poco. Se empiezan a escuchar sirenas de fondo. La policia se acerca y hay que actuar rapido.";
let textoPantalla6 = "Logras dejar todo como estaba y salir corriendo justo a tiempo para volver a tu despacho sin levantar sospechas.";
let textoPantalla7 = "Te quedas a intentar explicarle a la policia como es que llegaste a estar en esa situacion.";
let textoPantalla8 = "Llamas a tu odioso compañero. Juntos despues de un rato logran encontrar el almacen 10 y se deciden a entrar. Todo esta oscuro asi que sacan una linterna para buscar alguna pista.";
let textoPantalla9 = "Encuentran un cuerpo de un asesinato que pareciera que ocurrio hace poco tiempo. Justo en ese instante se empiezan a escuchar sirenas de policia de fondo. Es momento de actuar rapido.";
let textoPantalla10 = "Dejan todo como estaba y salen corriendo justo a tiempo para que la policia no los encuentre. Ahora tienen que dejar de lado las diferencias con tu compañero y averiguar como resolver el caso sin admitir que estuvieron ahi. Continuara...";
let textoPantalla11 = "Le decis a tu compañero de esperar a que llegue la policia para explicarle la situacion. Al llegar la policia lo inculpas diciendo que llegaste justo cuando estaba escondiendo el cuerpo.";
let textoPantalla12 = "Meten preso a tu compañero, te dan todo el credito por resolver el caso y volves a ser un detective reconocdo y prestigioso. Mientras tanto, en la carcel, tu compañero se pasa años planeando una venganza para cuando logre salir. Continuara...";
let textoPantalla13 = "La policia no se cree tu historia y tras varios dias de buscar otro sospechoso y no encontrarlo deciden declararte culpable y te mandan preso de por vida.";
let textoPantalla14 = "Luego de huir llegas a tu casa y empezas a planear como resolver el caso sin que sepan que estuviste ahi para volver a tener el reconocimiento que te mereces. Continuara...";

let compañero = false;

let luzFarol;
let spritesDetective = [];
let fotogramaDetective = 0;

function preload() {
  for (let i = 1; i < 16; i++) {
    imagenes[i] = loadImage("assets/pantalla" + i + ".jpg");
  }
  linterna = loadImage("assets/linterna.png");
  piernas = loadImage("assets/piernas.png");
  
  luzFarol = loadImage("assets/luz.png");
  sirena = loadSound("assets/sirena.mp3");
  
  lluvia = loadSound("assets/lluviaadentro.mp3");
  afuera = loadSound("assets/lluviaafuera.mp3");
  luz = loadSound("assets/luz.mp3");
  
  papel = loadSound("assets/papel.mp3");
  
  spritesDetective[0] = loadImage("assets/tile000.png");
  spritesDetective[1] = loadImage("assets/tile001.png");
  spritesDetective[2] = loadImage("assets/tile002.png");
  spritesDetective[3] = loadImage("assets/tile003.png");
}

function setup() {
  createCanvas(800, 450);
  textFont('Courier New');
}

function draw() {
  background(15);

  // Control del sonido de las sirenas
  if (pantallaActual === 5 || pantallaActual === 9) {
    if (sirena && sirena.isLoaded() && !sirena.isPlaying()) {
      sirena.loop(); 
    }
  } else {
    if (sirena && sirena.isPlaying()) {
      sirena.stop(); 
    }
  }

  //sonido de la lluvia adentro
  if (pantallaActual === 1 || pantallaActual === 4 || pantallaActual === 12 || pantallaActual === 13 || pantallaActual === 14) {
    if (lluvia && lluvia.isLoaded() && !lluvia.isPlaying()) {
      lluvia.setVolume(0.2);
      lluvia.loop(); 
    }
  } else {
    if (lluvia && lluvia.isPlaying()) {
      lluvia.stop(); 
    }
  }
  
  //sonido de la lluvia de afuera
  if (pantallaActual === 3 || pantallaActual === 6 || pantallaActual === 7 || pantallaActual === 8 || pantallaActual === 10 || pantallaActual === 11) {
    if (afuera && afuera.isLoaded() && !afuera.isPlaying()) {
      afuera.setVolume(0.3);
      afuera.loop(); 
    }
  } else {
    if (afuera && afuera.isPlaying()) {
      afuera.stop(); 
    }
  }
  
  //sonido de la luz parpadeante de la ultima pantalla
  if (pantallaActual === 15) { 
    if (luz && luz.isLoaded() && !luz.isPlaying()) {
      luz.setVolume(0.1);
      luz.loop(); 
    }
  } else {
    if (luz && luz.isPlaying()) {
      luz.stop(); 
    }
  }
  
  
  if (pantallaActual === 2 && !papelReproducido) {
  papel.play();
  papelReproducido = true;
}
  
//PANTALLAS
  if (pantallaActual === 1) {
    if (imagenes[1]) image(imagenes[1], 0, 0, width, height);

    if (caracteresVisibles < textoPantalla1.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla1.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);

  } else if (pantallaActual == 2) {
    if (imagenes[2]) image(imagenes[2], 0, 0, width, height);
    dibujarBoton(150, 350, 230, 50, "Ir solo al almacén");
    dibujarBoton(420, 350, 230, 50, "Llamar a tu compañero");

  } else if (pantallaActual == 3) {
    if (imagenes[3]) image(imagenes[3], 0, 0, width, height);
    if (caracteresVisibles < textoPantalla3.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla3.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);

  } else if (pantallaActual == 4) {
    if (imagenes[4]) image(imagenes[4], 0, 0, width, height);

    if (colisionBoton(180, 300, 75, 50)) {
      image(piernas, 0, 0, 800, 450);
    }

    if (millis() - tiempoMensaje < 2000) {
      push();
      fill(255, 50, 50);
      stroke(0);
      strokeWeight(2);
      textSize(14);
      textAlign(CENTER, CENTER);
      text("Acá no hay nada", mensajeX, mensajeY);
      pop();
    }

    dibujarLinterna();

  } else if (pantallaActual == 5) {
    if (imagenes[5]) image(imagenes[5], 0, 0, width, height);

    if (subestadoPantalla5 === 1) {
      if (caracteresVisibles < textoPantalla5.length) {
        caracteresVisibles += velocidadTexto;
      }
      let textoParcial = textoPantalla5.substring(0, floor(caracteresVisibles));
      stroke(100);
      strokeWeight(1);
      fill(0, 0, 0, 200); 
      rect(50, 310, 700, 110, 8);
      noStroke();
      fill(230);
      textSize(15);
      textAlign(LEFT, TOP);
      text(textoParcial, 70, 325, 660, 80);
      
      dibujarFlechaSiguiente(715, 395);

    } else if (subestadoPantalla5 === 2) {
      dibujarBoton(150, 350, 230, 50, "Salir corriendo");
      dibujarBoton(420, 350, 250, 50, "Quedarse y explicar la situacion");
    }

  } else if (pantallaActual == 6) {
    if (imagenes[6]) image(imagenes[6], 0, 0, width, height);
    if (caracteresVisibles < textoPantalla6.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla6.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);

  } else if (pantallaActual == 7) {
    if (imagenes[7]) image(imagenes[7], 0, 0, width, height);
    if (caracteresVisibles < textoPantalla7.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla7.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);

  } else if (pantallaActual == 8) {
    if (imagenes[8]) image(imagenes[8], 0, 0, width, height);
    if (caracteresVisibles < textoPantalla8.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla8.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);

  } else if (pantallaActual == 9) {
    if (imagenes[9]) image(imagenes[9], 0, 0, width, height);

    if (subestadoPantalla9 === 1) {
      if (caracteresVisibles < textoPantalla9.length) {
        caracteresVisibles += velocidadTexto;
      }
      let textoParcial = textoPantalla9.substring(0, floor(caracteresVisibles));
      stroke(100);
      strokeWeight(1);
      fill(0, 0, 0, 200); 
      rect(50, 310, 700, 110, 8);
      noStroke();
      fill(230);
      textSize(15);
      textAlign(LEFT, TOP);
      text(textoParcial, 70, 325, 660, 80);
      
      dibujarFlechaSiguiente(715, 395);

    } else if (subestadoPantalla9 === 2) {
      dibujarBoton(150, 350, 230, 50, "Salir corriendo");
      dibujarBoton(420, 350, 250, 50, "Inculpar a tu compañero");
    }

  } else if (pantallaActual == 10) {
    if (imagenes[10]) image(imagenes[10], 0, 0, width, height);
    if (caracteresVisibles < textoPantalla10.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla10.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);
  } else if (pantallaActual == 11) {
    if (imagenes[11]) image(imagenes[11], 0, 0, width, height);
    if (caracteresVisibles < textoPantalla11.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla11.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);
  } else if (pantallaActual == 12) {
    if (imagenes[12]) image(imagenes[12], 0, 0, width, height);
    if (caracteresVisibles < textoPantalla12.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla12.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);
  } else if (pantallaActual == 13) {
    if (imagenes[13]) image(imagenes[13], 0, 0, width, height);
    if (caracteresVisibles < textoPantalla13.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla13.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);
  } else if (pantallaActual == 14) {
    if (imagenes[14]) image(imagenes[14], 0, 0, width, height);
    if (caracteresVisibles < textoPantalla14.length) {
      caracteresVisibles += velocidadTexto;
    }
    let textoParcial = textoPantalla14.substring(0, floor(caracteresVisibles));
    stroke(100);
    strokeWeight(1);
    fill(0, 0, 0, 200); 
    rect(50, 310, 700, 110, 8);
    noStroke();
    fill(230);
    textSize(15);
    textAlign(LEFT, TOP);
    text(textoParcial, 70, 325, 660, 80);
    dibujarFlechaSiguiente(715, 395);
  } else if (pantallaActual == 15) {
    
    if (imagenes[15]) image(imagenes[15], 0, 0, width, height);

    
    push();
    if (random(100) > 15) {
      let alfaLuz = map(sin(frameCount * 0.1), -1, 1, 160, 255);
      tint(255, alfaLuz);
      if (luzFarol) image(luzFarol, 0, 0, width, height);
    }
    pop();

    if (frameCount % 30 === 0) {
      fotogramaDetective = (fotogramaDetective + 1) % spritesDetective.length;
    }
    if (spritesDetective[fotogramaDetective]) {
      image(spritesDetective[fotogramaDetective], 10, 180, 120, 240);
    }

    
    push();
    fill(0, 0, 0, 200);
    stroke(100);
    strokeWeight(1);
    rect(220, 30, 360, 310, 8);

    textAlign(CENTER, CENTER);
    
    let tinteRojo = map(sin(frameCount * 0.05), -1, 1, 120, 255);
    fill(tinteRojo, 40, 40);
    textSize(20);
    textStyle(BOLD);
    text("— CRÉDITOS —", width / 2, 60);

    fill(230);
    textSize(14);
    textStyle(BOLD);
    text("HISTORIA:", width / 2, 105);
    fill(180);
    textSize(13);
    textStyle(NORMAL);
    text("El misterio del almacen 10", width / 2, 125);

    fill(230);
    textSize(14);
    textStyle(BOLD);
    text("AUTOR:", width / 2, 165);
    fill(180);
    textSize(13);
    textStyle(NORMAL);
    text("Juan Garganta", width / 2, 185);
    text("Francesca Bonfiglio Ros", width / 2, 205);
    pop();

    
    dibujarBoton(275, 365, 250, 45, "Volver al Inicio");
  }
}

function dibujarFlechaSiguiente(x, y) {
  let hovering = colisionBoton(x - 15, y - 15, 30, 30);

  push();
  stroke(hovering ? 255 : 180);
  strokeWeight(3);
  fill(hovering ? 255 : 180);

  triangle(
    x - 10, y - 10, 
    x - 10, y + 10, 
    x + 10, y       
  );
  pop();
}

function colisionBoton(x, y, w, h) {
  return (
    mouseX > x &&
    mouseX < x + w &&
    mouseY > y &&
    mouseY < y + h
  );
}

function mousePressed() {
  
  userStartAudio();

  if (pantallaActual == 1) {
    if (colisionBoton(700, 380, 30, 30)) {
      pantallaActual = 2;
      caracteresVisibles = 0;
    }
  } else if (pantallaActual == 2) {
    if (colisionBoton(150, 350, 230, 50)) {
      pantallaActual = 3;
      compañero = false;
      caracteresVisibles = 0;
      papelReproducido = false;
    } else if (colisionBoton(420, 350, 230, 50)) {
      pantallaActual = 8;
      compañero = true;
      caracteresVisibles = 0;
      papelReproducido = false;
    }
  } else if (pantallaActual == 3) {
    if (colisionBoton(700, 380, 30, 30)) {
      pantallaActual = 4;
    }
  } else if (pantallaActual == 4) {
    if (colisionBoton(180, 300, 75, 50)) {
      if (compañero === false) {
        pantallaActual = 5;
        subestadoPantalla5 = 1;
        caracteresVisibles = 0;
      } else {
        pantallaActual = 9;
        subestadoPantalla9 = 1;
        caracteresVisibles = 0;
      }
    } else {
      mensajeX = mouseX;
      mensajeY = mouseY;
      tiempoMensaje = millis();
    }
  } else if (pantallaActual == 5) {
    if (subestadoPantalla5 === 1) {
      if (colisionBoton(700, 380, 30, 30)) {
        subestadoPantalla5 = 2;
      }
    } else if (subestadoPantalla5 === 2) {
      if (colisionBoton(150, 350, 230, 50)) {
        pantallaActual = 6;
        caracteresVisibles = 0;
      } else if (colisionBoton(420, 350, 250, 50)) {
        pantallaActual = 7;
        caracteresVisibles = 0;
      }
    }
  } else if (pantallaActual == 6) {
    if (colisionBoton(700, 380, 30, 30)) {
      pantallaActual = 14;
      compañero = false;
      caracteresVisibles = 0;
    }
  } else if (pantallaActual == 7) {
    if (colisionBoton(700, 380, 30, 30)) {
      pantallaActual = 13;
      compañero = false;
      caracteresVisibles = 0;
    }
  } else if (pantallaActual == 8) {
    if (colisionBoton(700, 380, 30, 30)) {
      pantallaActual = 4;
      caracteresVisibles = 0;
    }
  } else if (pantallaActual == 9) {
    if (subestadoPantalla9 === 1) {
      if (colisionBoton(700, 380, 30, 30)) {
        subestadoPantalla9 = 2;
      }
    } else if (subestadoPantalla9 === 2) {
      if (colisionBoton(150, 350, 230, 50)) {
        pantallaActual = 10;
        caracteresVisibles = 0;
      } else if (colisionBoton(420, 350, 250, 50)) {
        pantallaActual = 11;
        caracteresVisibles = 0;
      }
    }
  } else if (pantallaActual == 11) {
    if (colisionBoton(700, 380, 30, 30)) {
      pantallaActual = 12;
      caracteresVisibles = 0;
    }
  } else if (pantallaActual == 10 || pantallaActual == 12 || pantallaActual == 13 || pantallaActual == 14) {
    if (colisionBoton(700, 380, 30, 30)) {
      pantallaActual = 15;
      caracteresVisibles = 0;
    }
  } else if (pantallaActual == 15) {
    if (colisionBoton(275, 365, 250, 45)) {
      pantallaActual = 1;
      compañero = false;
      caracteresVisibles = 0;
      subestadoPantalla5 = 1;
      subestadoPantalla9 = 1;
    }
  }
}

function dibujarBoton(x, y, w, h, texto) {
  let hovering = colisionBoton(x, y, w, h);

  push();
  stroke(hovering ? 255 : 120);
  strokeWeight(2);
  fill(hovering ? 60 : 20, 220);
  rect(x, y, w, h, 6);

  noStroke();
  fill(hovering ? 255 : 200);
  textSize(13);
  textAlign(CENTER, CENTER);
  text(texto, x + w / 2, y + h / 2);
  pop();
}

function dibujarLinterna() {
  let x = constrain(mouseX, 0, width);
  let y = constrain(mouseY, 0, height);

  push();
  imageMode(CENTER);
  image(linterna, x, y);
  pop();
}
