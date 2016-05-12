﻿#pragma strict

var estatuaSound : AudioClip; //chest opening sound clip goes here
 
function OnTriggerEnter (col : Collider) {
 
if(col.gameObject.tag == "Player") { //checks to see that our character controller with tag "Player" has entered the trigger
AudioSource.PlayClipAtPoint(estatuaSound, transform.position); //plays our soundclip at position of collider/trigger
//Destroy(gameObject);// destroys the gameobject that has this script, so our collider in this case
 
}
}