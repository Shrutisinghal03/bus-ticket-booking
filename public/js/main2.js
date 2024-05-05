const pm=document.getElementById("paym")
const bookseat=()=>{
    const bid=document.getElementById('bid').value;
    fetch(`/getseatdata?bid=${bid}`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data); 
        let d=[]; 
        data.map((item)=>{
            d.push(item.seatNumber); 
        })
        console.log(d); 
        let seatd=document.getElementById('booking');
       
        for(let i=1;i<25;i++){
            if(d.includes(i))
            {
              seatd.innerHTML+=` <button class="booktic" style='background-color:red'> <img src="/images/chair2.jpeg" alt=""></button>`
            }
            else{
              seatd.innerHTML+=` <button class="booktic" id="seatBook~${i}" style='background-color:green' onclick="seatSelection( this)"> <img src="/images/chair2.jpeg" alt=""></button>`
              // seatd.innerHTML+=` <button class="booktic" style='background-color:green' onclick="selectseat('/bookseat?bid=${bid}&seat=${i}')"> <img src="/images/chair2.jpeg" alt=""></button>`
            }  
        }
    })
   
}

bookseat(); 
const selectseat=(data)=>{
window.location.href=data; 
}




/* Function to make the seat selection  */

function seatSelection ( element) {
    if (!element.classList.contains ("selected")){
      element.classList.add("selected");
    }

    else{
      element.classList.remove("selected");
    }
   
}



/* Go to book seat confirmation page */

function booked(){
  var elements = document.getElementsByClassName("selected");
  let seats = [];

  for (var i = 0; i < elements.length; i++) {
    seats.push(elements[i].id.split("~")[1]);
  }

  fetch ('/bookseat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      bid: document.getElementById('bid').value,
      seats: seats
    })
  })

  .then(res => res.json())
  .then(data => {
    if (data.status == 'success') {
      window.location.href = '/pay';
    }
  })
}