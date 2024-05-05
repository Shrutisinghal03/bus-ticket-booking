



const routesel = () => {
    let source = document.getElementById('source').value;
    let dest = document.getElementById('dest').value;
     let d = document.getElementById('date').value;
     
    let data = [];
     console.log(d); 
    fetch(`/dest?fname=${source}&lname=${dest}&date=${d}`)
        .then(response => response.json())
        .then(data => {
            rendering(data);
        })
}
routesel();
const rendering = (data) => {
    const container = document.querySelector('.buslist'); // Assuming you have an element with class 'buslist' to append items to
    console.log(data);
    container.classList.add('contlayout')
    data.forEach((e) => {
        const item = document.createElement('div');
        item.classList.add('buslayout');
        item.innerHTML = `
      

<div class="bustank ">  
       <div  class="busti ">
        <img src="/images/busimg.jpg"> 
      </div>
      <div class="busd">
          <div  >
              <p class="gradient-text">CompanyName</p>
              <p class="gradient-text">Bustype</p>
              <p class="gradient-text">BusNumber</p>
              <p class="gradient-text">price</h3>
        </div>
   <div>
    <p class="gradient-text">${e.companyName}</p>
    <p class="gradient-text">${e.busType}</p>
    <p class="gradient-text">${e.busNumber}</p>
    <p class="gradient-text">${e.pricePerSeat}</p>
    </div>
    <div>
    <p class="gradient-text"> ${e.startCity}   -----> ${e.destination}</p>
    <p class="gradient-text"> ${e.start_time}   -----> ${e.end_time}</p>
   <a href="/seats?bid=${e.id}"> <button class="btn-txt" > Book Tickets </button></a>
    </div>
</div> 
    

    </div> 
        



       `;
        container.appendChild(item);
    })
}
rendering(); 
