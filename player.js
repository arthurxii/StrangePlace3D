 #pragma strict
 
 public var theCamera : Transform;
 
 private var movementSpeed : float = 5.0;
 private var myTransform : Transform;
 
 
 function Start() 
 {
     myTransform = this.transform;
 }
 
 function Update() 
 {
     // get inputs
     var inputX : float = Input.GetAxis( "Horizontal" );
     var inputY : float = Input.GetAxis( "Vertical" );
     
     // get current position, then do calculations
     var moveVectorX : Vector3 = theCamera.forward * inputY;
     var moveVectorY : Vector3 = theCamera.right * inputX;
     var moveVector : Vector3 = ( moveVectorX + moveVectorY ).normalized * movementSpeed * Time.deltaTime;
     
     // update Character position
     myTransform.position = myTransform.position + Vector3( moveVector.x, 0.0, moveVector.z );
     
     // and rotation
     myTransform.LookAt( myTransform.position + Vector3( moveVector.x, 0.0, moveVector.z ) );
     
 }