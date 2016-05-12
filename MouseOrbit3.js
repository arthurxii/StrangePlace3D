 #pragma strict
 
 public var TargetLookAt : Transform;
 
 public var Distance : float = 5.0;
 public var DistanceMin : float = 3.0;
 public var DistanceMax : float = 10.0;
 
 private var mouseX : float = 0.0;
 private var mouseY : float = 0.0;
 private var startingDistance : float = 0.0;    
 private var desiredDistance : float = 0.0;
 
 public var X_MouseSensitivity : float = 5.0;
 public var Y_MouseSensitivity : float = 5.0;
 public var MouseWheelSensitivity : float = 5.0;
 public var Y_MinLimit : float = -40.0;
 public var Y_MaxLimit : float = 80.0;
 
 public var DistanceSmooth : float = 0.05;    
 private var velocityDistance : float = 0.0;    
 private var desiredPosition : Vector3 = Vector3.zero;
 
 public var X_Smooth : float = 0.05;
 public var Y_Smooth : float = 0.1;
 private var velX : float = 0.0;
 private var velY : float = 0.0;
 private var velZ : float = 0.0;
 private var position : Vector3 = Vector3.zero;    
 
 
 function Start()
 {
     Distance = Mathf.Clamp(Distance, DistanceMin, DistanceMax);
     startingDistance = Distance;
     Reset();
 }
 
 
 
 function Update(){

//Updating camera distance on every frame
Distance = Raycast3.distance3;

//Setting maximum distance so the camera doesnt go too far
if(Distance > 3){
Distance = 3;
}



}
 
 
 
 
 
 
 function LateUpdate()
 {
     if (TargetLookAt == null)
         return;
         
     HandlePlayerInput();
         
     CalculateDesiredPosition();
         
     UpdatePosition();
 }
 
 function HandlePlayerInput()
 {
     var deadZone = 0.01; // mousewheel deadZone
     
     //if (Input.GetMouseButton(1))
     //{
         mouseX += Input.GetAxis("Mouse X") * X_MouseSensitivity;
         mouseY -= Input.GetAxis("Mouse Y") * Y_MouseSensitivity;
     //}
     
     // this is where the mouseY is limited - Helper script
     mouseY = ClampAngle(mouseY, Y_MinLimit, Y_MaxLimit);
     
     // get Mouse Wheel Input
     if (Input.GetAxis("Mouse ScrollWheel") < -deadZone || Input.GetAxis("Mouse ScrollWheel") > deadZone)
     {
         desiredDistance = Mathf.Clamp(Distance - (Input.GetAxis("Mouse ScrollWheel") * MouseWheelSensitivity), 
                                                                             DistanceMin, DistanceMax);
     }
 }
 
 function CalculateDesiredPosition()
 {
     // Evaluate distance
     Distance = Mathf.SmoothDamp(Distance, desiredDistance, velocityDistance, DistanceSmooth);
     
     // Calculate desired position -> Note : mouse inputs reversed to align to WorldSpace Axis
     desiredPosition = CalculatePosition(mouseY, mouseX, Distance);
 }
 
 function CalculatePosition(rotationX : float, rotationY : float, distance : float)
 {
     var direction : Vector3 = Vector3(0, 0, -distance);
     var rotation : Quaternion = Quaternion.Euler(rotationX, rotationY, 0);
     return TargetLookAt.position + (rotation * direction);
 }
 
 function UpdatePosition()
 {
     var posX = Mathf.SmoothDamp(position.x, desiredPosition.x, velX, X_Smooth);
     var posY = Mathf.SmoothDamp(position.y, desiredPosition.y, velY, Y_Smooth);
     var posZ = Mathf.SmoothDamp(position.z, desiredPosition.z, velZ, X_Smooth);
     position = Vector3(posX, posY, posZ);
     
     transform.position = position;
     
     transform.LookAt(TargetLookAt);
 }
 
 function Reset()
 {
     mouseX = 0;
     mouseY = 10;
     Distance = startingDistance;
     desiredDistance = Distance;
 }
 
 function ClampAngle(angle : float, min : float, max : float)
 {
     while (angle < -360 || angle > 360)
     {
         if (angle < -360)
             angle += 360;
         if (angle > 360)
             angle -= 360;
     }
     
     return Mathf.Clamp(angle, min, max);
 }