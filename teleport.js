#pragma strict

var target : Transform;
 
function Update () {
 
}
 
function OnTriggerEnter (col : Collider) {
 
        if(col.gameObject.tag == "Teleport") {
                this.transform.position = target.position;
        }
}