
//Logic of web app
// Datos ingresables
let A = 3730 // Altitud
let B = 16// Temperatura

// Datos seleccionables
let C = 245// Tension maxima
let D = 1300// Nivel basico de aislamiento, 
let D_1 = 2600// Distancia critica
let E = 460 // Nivel de conmutacion
let F = 43.3 // Nivel de contaminacion | muy ligero, ligero, medio, pesado, muy pesado

// Datos ingresables
let N_1 = 4 // Numero de conductores por fase
let T_1 = 300 // Tension horizontal maxima

// Datos seleccionables
let G = 0.8 // Tipo de aislador o perfil
let H // Codigo de aislador
let I = 4000 // Carga
let J = 445 // Distancia de fuga
let K = 146 // Paso
let L = 280 // Diametro
let M = 85 // TF- seco
let N = 50 // TF-Lluvia
let O = 125 // TF-Rayo
let P = 5.7 // Peso del aislador

// Datos climaticos
// Dato ingresable
let Q = 70 // Humedad relativa

// Factor de correccion climatico
// Dato seleccionable
let R = 1 // Factor de correccion por lluvia

// Herrajes para la cadena de aisladores
// Dato ingresable
let P_H = 10 // Peso del herraje de la cadena
let Z = 1.01979

function metodo1(A, C, F, G, J, L, D_1, K) {
  // Calcular N1
  if (A >= 1000) {
    temp = Math.exp(G * (A / 8150));
  } else {
    temp = 1;
  }
  console.log("temp: ")
  console.log(temp)

  let N1 = 0
  if (L >= 300) {
    N1 = (1.15 * F * temp * (0.0005 * L + 0.85) * C) / (J * Math.sqrt(3))
  } else {
    N1 = (1.15 * F * temp * C) / (J * Math.sqrt(3))
  }
  console.log("N1: ")
  console.log(N1)

  let S = (N1 * J * Math.sqrt(3)) / (C * 1.15 * D_1)
  console.log("S: ")
  console.log(S)

  if (F == 22) {
    if (S >= 4.25) {
      console.log("Cambiar perfil.")
    } else if (S >= 3.5){
      console.log("El perfil no es el adecuado.")
    }
  }
  if (F == 27.8) {
    if (S >= 4.4) {
      console.log("Cambiar perfil.")
    } else if (S >= 3.625){
      console.log("El perfil no es el adecuado.")
    }
  }
  if (F == 34.7) {
    if (S >= 4.55) {
      console.log("Cambiar perfil.")
    } else if (S >= 3.75){
      console.log("El perfil no es el adecuado.")
    }
  }
  if (F == 43.3) {
    if (S >= 4.7) {
      console.log("Cambiar perfil.")
    } else if (S >= 3.875){
      console.log("El perfil no es el adecuado.")
    }
  }
  if (F == 53.7) {
    if (S >= 4.85) {
      console.log("Cambiar perfil.")
    } else if (S >= 4.0){
      console.log("El perfil no es el adecuado.")
    }
  }

  // Calcular N2 
  let N2 =  1 + (D_1 - 200) / K
  console.log("N2: ")
  console.log(N2)

  let Y = 0 
  if (N1 - N2 >= 0) {
    Y = N1
  } else {
    Y =N2
  }
  console.log("Y: ")
  console.log(Y)

  return Y;
}

function metodo2(A, B, C, D, E, F, J, M, N, O, R, V) {
  let n
  if (C > 230) {
    n = 0.9
  } else {
    n = 1
  }

  // Calculo de V
  V = (C * 1.15 * F) / (Math.sqrt(3) * J * Math.pow(297.92 * Math.pow(0.885, A / 1000) / (273.15 + B), n))
  console.log("V: ")
  console.log(V)

  // Calculo de X
  let numeradorDeX = D * Z * (1 + ((A - 1000) / Math.pow(10, 6)) * 125)
  console.log("numeradorDeX: ")
  console.log(numeradorDeX)
  let denominadorDeX = 0.961 * R * 297.92 * Math.pow(0.885, A / 1000) / (273.15 + B)
  console.log("denominadorDeX: ")
  console.log(denominadorDeX)
  let X = numeradorDeX / denominadorDeX
  console.log("X: ")
  console.log(X)

  // Calculo de W
  let numeradorDeW = E * Z * (1 + (A - 1000) * 125 / Math.pow(10, 6))
  let denominadorDeW = 0.992 * R * 297.92 * Math.pow(0.885, A / 1000) / (273.15 + B)
  let W = numeradorDeW / denominadorDeW
  console.log("W: ")
  console.log(W)

  if ((V * O > X) && (V * M > W) && (V * N > W)) {
    return V
  } else {
    console.log("Aumentar cantidad de aisladores.")
  }
}

let V = metodo2(A, B, C, D, E, F, J, M, N, O, R)
console.log("Retornar V: ")
console.log(V)

let Y = metodo1(A, C, F, G, J, L, D_1, K)
console.log("Retornar Y: ")
console.log(Y)

let A_1
if (V >= Y) {
  A_1 = Math.ceil(Y)
} else {
  A_1 = Math.ceil(V)
}
console.log("El numero de aisladores necesarios es: ")
console.log("A_1")
console.log(A_1)

// Leer variables mecanicas
let C_1 // Coeficiente de seguridad a la rotura de los aisladores con cargas anormales
let P_1 = 800 // Esfuerzo vertical transmitido por los conductores al aislador
let P_2 = 26 // Peso de la cadena de aisladores y herrajes
let C_2 // Coeficiente de seguridad a la rotura de los aisladores con cargas normales
let L_1 // Longitud de la cadena
let P_3 // Peso de la cadena
let E_1 // Esfuerzo del viento sobre la cadena
let V_1 = 31 // Velocidad del viento

P_3 = A_1 * P
console.log("P_3: ")
console.log(P_3)
P_2 = (P_3 * 9.81 / 10) + P_H
console.log("P_2: ")
console.log(P_2)

// Calcular C_1 y C_2
C_1 = I / (T_1 * N_1)
console.log("C_1: ")
console.log(C_1)
C_2 = I / (P_1 + P_2)
console.log("C_2: ")
console.log(C_2)

if ((C_1 > 3) && (C_2 > 3)) {
  L_1 = A_1 * K
  E_1 = 70 * Math.pow(V_1 / 120, 2) * (L / 1000) * L_1
} else {
  console.log("Aumentar el valor de I y cambiar el modelo de mayor carga.")
}
