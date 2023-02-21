const { request } = require("./requests");
const cheerio = require("cheerio");

const infoEvents = async (id) => {
  const url = `https://ctftime.org/event/${id}`;

  try {
    const response = await request(url, "GET");

    const $ = cheerio.load(response.data);
    const link = $(".span10 > p > a[rel='nofollow']").text();
    const img = `https://ctftime.org/${$(".span2 > img").attr("src")}`;
    const title = $("h2").text().trim();
    const date = $(".span10 > p:eq(0)").text().trim();
    const locationSite = $(".span10 > p:eq(1)").text().trim();
    const locationCTF = $(".span10 > p:eq(2)").text().trim();
    const format = $(".span10 > p:eq(4)").text().trim().replace("Format: ", "");
    const weight = $(".span10 > p:eq(7)")
      .text()
      .trim()
      .replace("Rating weight: ", "");

    const info = {
      title,
      link,
      img,
      date,
      location: `${locationSite} - ${locationCTF}`,
      format,
      weight,
    };

    return info;
  } catch (error) {
    return [];
  }
};

const getEvents = async (time) => {
  const url = `https://ctftime.org/event/list/?year=${new Date().getFullYear()}&${time}`;

  try {
    const response = await request(url, "GET");
    const $ = cheerio.load(response.data);
    const event = [];
    const tableEvent = $("table > tbody > tr");

    if (tableEvent.length > 0) {
      tableEvent.each((_idx, el) => {
        if (event.length === 3) return;

        const idCTF = $(el).find("td > a").eq(0).attr("href");
        const nameCTF = $(el).find("td").eq(0).text();
        const dateCTF = $(el).find("td").eq(1).text();
        const formatCTF = $(el).find("td").eq(2).text();
        const locationCTF = $(el)
          .find("td")
          .eq(3)
          .text()
          .replace(/(\r\n|\n|\r)/gm, "")
          .trim();
        const weightCTF = $(el).find("td").eq(4).text();
        const notesCTF = $(el)
          .find("td")
          .eq(6)
          .text()
          .replace(/(\r\n|\n|\r)/gm, "")
          .trim();

        if (
          idCTF == "" ||
          nameCTF == "" ||
          dateCTF == "" ||
          weightCTF == "" ||
          notesCTF == ""
        )
          return;

        const infoCTF = {
          id: idCTF.replace(/\/event\//gm, ""),
          name: nameCTF,
          date: dateCTF,
          weight: weightCTF,
          notes: notesCTF,
          format: formatCTF,
          location: locationCTF,
        };

        event.push(infoCTF);
      });
    }

    return event;
  } catch (error) {
    return [];
  }
};

module.exports = { getEvents, infoEvents };
