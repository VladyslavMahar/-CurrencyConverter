export default class Servise {
  static async getData() {
    const response = await fetch(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    );
    const data = await response.json();
    return data;
  }
}
