static var distance3 : float = 5;


function Update () {


var hit: RaycastHit;
var fwd = transform.TransformDirection (Vector3.forward);


if (Physics.Raycast (transform.position,fwd,hit)) {
distance3 = hit.distance;

}
}