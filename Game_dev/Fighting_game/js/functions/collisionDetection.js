//----------------------------------------------------------// Collision Detection Function //--------------------------------- //
function collisionDetection({ rectangle1, rectangle2 }) {
    return (
      /* if rectangle1's attack box is touching rectangle2 
      (position.x is the left side of the box so add width to get right side) */
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
      /* if rectangle1's attack box is past rectangle2 */
      rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
      /* check for collision vertically 
      (position.y is the bottom so add height to get the top of the box) */
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
  }