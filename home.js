#pragma strict

var posiX: float;
var posiY: float;

var altura: float;
var largura: float;

function Start () {

largura = 200;
altura = 100;
posiX = Screen.width/3 - largura/2;
posiY = Screen.height/2 - altura/2;

}

function Update () {

}
function OnGUI(){

if (GUI.Button(Rect(posiX,posiY,largura,altura),"Iniciar o Jogo")) // Botao Simples
{
Application.LoadLevel("intro");
}
}