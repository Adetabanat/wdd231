function feedbackMessage() {
    const messageBox = document.querySelector(".message-box");
  
    const welcomeMsg = `<h1>Welcome! Let us know if you have any questions.</h1>`;
    const welcomeBack = `<h1>Back so soon! Awesome!</h1>`;
    const sinceLastVist = `<h1>You last visited [n] days ago</h1>`;
  
    // number of milliseconds in a day
    const millisecToDay = 1000 * 60 * 60 * 24;
  
    // checking if previous visit timestamp exist in local storage
    let lastVisit = Number(JSON.parse(localStorage.getItem("visitTimeStamp")));
    // getting today's date in milliseconds
    const currentTime = Date.now();
  
    if (lastVisit) {
      // calculating the days past since the last visit
  
      const daysPast = Math.abs(
        Math.trunc((currentTime - lastVisit) / millisecToDay)
      );
      // give user feedback based on the days past
      if (daysPast === 0) {
        messageBox.innerHTML = welcomeBack;
      } else {
        messageBox.innerHTML = sinceLastVist.replace("[n]", daysPast);
      }
    } else {
      messageBox.innerHTML = welcomeMsg;
    }
  
    localStorage.setItem("visitTimeStamp", JSON.stringify(currentTime));
  }
  feedbackMessage();