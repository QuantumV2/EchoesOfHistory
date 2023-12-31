const eventsContainer = document.getElementById("eventsContainer");

function loadMoreEvents() {
  fetch(
    "https://gist.githubusercontent.com/QuantumV2/7b8dacc7726f861174aa9f9b444c3241/raw/92c4f25e9d4628e5e88acde9db8b4c0f502a4dcf/echeosofhistory.json"
  )
    .then((response) => response.json())
    .then((events) => {
      events.forEach((event) => {
        const eventElement = createEventElement(event);
        eventsContainer.appendChild(eventElement);
      });
    })
    .catch((error) => console.error("Error loading events:", error));
}

function createEventElement(event) {
  const element = document.createElement("div");
  element.className = "event-tweet";

  // Use a regular expression to match hashtags
  const hashtagRegex = /#(\w+)/g;
  // Use a regular expression to match @mentions
  const mentionRegex = /@(\w+)/g;

  // Replace hashtags with a span element
  const contentWithHashtags = event.echo.replace(
    hashtagRegex,
    '<span class="hashtag">#$1</span>'
  );

  // Replace @mentions with a span element
  const contentWithHashtagsAndMentions = contentWithHashtags.replace(
    mentionRegex,
    '<span class="mention">@$1</span>'
  );

  element.innerHTML = `
    <div class="user-info flex-container">
        <div class="square-image-container">
          <img src=${event.pfp}></img>
        </div>
        <b style="margin-top: 5px;margin-left: 10px;">${event.username}</b>
        <div class="tweet-date" style="margin-top: 10px;margin-left: 10px;">${event.date}</div>
    </div>
    <div class="tweet-content">${contentWithHashtagsAndMentions}</div>
    <img src=${event.image} width="400" height="400"></img>
 `;
  return element;
}

loadMoreEvents();