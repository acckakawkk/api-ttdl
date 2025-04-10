const { chromium } = require('playwright');

async function wedangJahe(res, status, data) {
  res.setHeader("Content-Type", "application/json");
  res.status(status).send(JSON.stringify(data, null, 2));
}

module.exports = async (req, res) => {
  const serabi = req.query.url;

  if (serabi === undefined) {
    return wedangJahe(res, 200, {
      status: "000",
      creator: "@bltokproject",
      error: "Mana parameter urlnya woy😂"
    });
  }

  if (!serabi) {
    return wedangJahe(res, 200, {
      status: "000",
      creator: "@bltokproject",
      error: "Mana url tiktoknya woy😂"
    });
  }

  const klepon = await chromium.launch({ headless: true });
  const ondeOnde = await klepon.newPage();

  try {
    await ondeOnde.goto('https://tmate.cc/id', { timeout: 60000 });
    await ondeOnde.fill('#url', serabi);
    await ondeOnde.click('#send');
    await ondeOnde.waitForSelector('h1[itemprop="name"]', { timeout: 15000 });

    const gethuk = await ondeOnde.$eval('p > span', el => el.textContent.trim());
    const lupis = await ondeOnde.$eval('h1[itemprop="name"] a', el => el.getAttribute('title') || el.textContent.trim());
    const cenil = await ondeOnde.getAttribute('a[href*="/mp3/"]', 'href');

    const jenang = await ondeOnde.$$eval('a.btn-main[href*="/photo/"]', els =>
      els.map(el => el.getAttribute('href'))
    );

    const hasil = {
      status: 200,
      creator: "@bltokproject",
      data: {
        nama: gethuk,
        deskripsi: lupis
      },
      download: {}
    };

    if (jenang.length > 0) {
      jenang.forEach((link, i) => {
        hasil.download[`foto${i + 1}`] = link;
      });
      if (cenil) hasil.download.mp3 = cenil;
    } else {
      const rengginang = await ondeOnde.getAttribute('a:has-text("Download without Watermark")', 'href');
      const krasikan = await ondeOnde.getAttribute('a:has-text("Download without Watermark [HD]")', 'href');
      const tiwul = await ondeOnde.getAttribute('a:has-text("Download with Watermark")', 'href');

      hasil.download = {
        nowm: rengginang,
        nowmHd: krasikan,
        withwm: tiwul,
        mp3: cenil
      };
    }

    wedangJahe(res, 200, hasil);
  } catch (lemper) {
    wedangJahe(res, 200, {
      status: 200,
      creator: "@bltokproject",
      error: lemper.message
    });
  } finally {
    await klepon.close();
  }
};
