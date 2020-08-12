const RSS_URL = "https://write.m-gautier.fr/feed";

fetch(RSS_URL)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
    console.log(data);
    const items = data.querySelectorAll("item");
    let html = `<article>
    <ul class="list">`;

    items.forEach((el, index) => {
      if (index < 9) {
        const title = el.querySelector("title").innerHTML;
        const rawDate = el.querySelector("pubDate").innerHTML;
        const date = new Date(rawDate);
        const formatted_date =
          date.getDate() +
          "-" +
          (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) +
          "-" +
          date.getFullYear();
        html += `
            <li class="list-item">
              <a class="list-item-link" href="${
                el.querySelector("link").innerHTML
              }" target="_blank" rel="noopener">
                <span class="list-item-link-title">${title}</span>
                <span>${formatted_date}</span>
              </a>
            </li>
      `;
      }
    });
    html += `
      </ul>
    </article>`;
    document.body.getElementsByTagName("output")[0].insertAdjacentHTML("afterbegin", html);
  });
