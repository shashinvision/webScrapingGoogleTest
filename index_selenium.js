const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("chromedriver").path; // Para usar otro navegador como Brave

let options = new chrome.Options();
options.setChromeBinaryPath(
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
);
// options.addArguments(
//   "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
// );

(async function example() {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://www.google.com/ncr");
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);

    // Obtén todos los elementos 'h3' que representan los títulos de los resultados de la búsqueda
    let elements = await driver.findElements(By.tagName("h3"));

    // Itera sobre los elementos y obtén el texto (título)
    for (let i = 0; i < elements.length; i++) {
      let title = await elements[i].getText();
      console.log(title);
    }
  } finally {
    await driver.quit();
  }
})();
