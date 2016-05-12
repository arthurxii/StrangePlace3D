#pragma strict

var posiX: float;
var posiY: float;

var altura: float;
var largura: float;

function Start () {

largura = 200;
altura = 100;
posiX = Screen.width/2 - largura/2;
posiY = Screen.height-150 - altura/2;

}

function Update () {

}
function OnGUI(){

if (GUI.Button(Rect(posiX,posiY,largura,altura),"Menu Principal")) // Botao Simples
{
Application.LoadLevel("home");
}
}