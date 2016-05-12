var target : Transform;
var distance = 10.0;
 
var xSpeed = 250.0;
var ySpeed = 120.0;
 
var yMinLimit = -20;
var yMaxLimit = 80;
 
var distanceMin = 3;
var distanceMax = 15;
 
private var x = 0.0;
private var y = 0.0;
 
 
@script AddComponentMenu("Camera-Control/Mouse Orbit")
 
function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;
 
	// Make the rigid body not change rotation
   	if (GetComponent.<Rigidbody>())
		GetComponent.<Rigidbody>().freezeRotation = true;
}
 
 
 function Update(){

//Updating camera distance on every frame
distance = Raycast3.distance3;

//Setting maximum distance so the camera doesnt go too far
if(distance < 3){
distance = 3;
}
if(distance > 3){
distance = 3;
}



//Make the camera rotate not only with the mouse, but also with Arrow Keys/WASD
if(( Input.GetKey(KeyCode.A)) || ( Input.GetKey(KeyCode.LeftArrow))) {
x -= 3; //The higher the number the faster the camera rotation
}
if(( Input.GetKey(KeyCode.D)) || ( Input.GetKey(KeyCode.RightArrow))) {
x += 3; //The higher the number the faster the camera rotation
}

}
 
 
 
 
 
 
 
function LateUpdate () {
    if (target) {
        x += Input.GetAxis("Mouse X") * xSpeed * distance* 0.02;
        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;
 
 		y = ClampAngle(y, yMinLimit, yMaxLimit);
 
		var rotation = Quaternion.Euler(y, x, 0);
 
		distance = Mathf.Clamp(distance - Input.GetAxis("Mouse ScrollWheel")*5, distanceMin, distanceMax);
 
		var hit : RaycastHit;
		if (Physics.Linecast (target.position, transform.position, hit)) {
				distance -=  hit.distance;
		}
 
        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
 
        transform.rotation = rotation;
        transform.position = position;
 
	}
 
}
 
 
static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Mathf.Clamp (angle, min, max);
}