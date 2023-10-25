import { getChartData, getChartDataWithoutTime } from "service/trading-chart";
const history: any = {};

export default {
  history: history,
  hitted: false,

  //@ts-ignore
  getBars: function (symbolInfo, resolution, from, to, first, limit) {
    const base = localStorage.getItem("base_coin_id");
    const trade = localStorage.getItem("trade_coin_id");
    if (this.hitted === false) {
      this.hitted = true;
      return getChartData(15, from, to, base, trade).then((data: any) => {
        if (data.data.data.length) {
          const myBars = data.data.data;
          let klines4800 = [...myBars, ...myBars];
          // if (klines4800.length < 320) {
          //   for (let i = 0; i < 320; i++) {
          //     klines4800 = [...klines4800, ...myBars];
          //   }
          // }
          const bars = klines4800.map((el: any) => ({
            time: el.time * 1000,
            low: parseFloat(el.low),
            high: parseFloat(el.high),
            open: parseFloat(el.open),
            close: parseFloat(el.close),
            volume: parseFloat(el.volume),
          }));
          if (first) {
            const lastBar = bars[bars.length - 1];
            history[symbolInfo.name] = { lastBar };
          }
          return bars;
        }
        return [];
      });
    } else {
      return getChartDataWithoutTime(5, from, to, base, trade).then(
        (data: any) => {
          if (data.data.data.length) {
            const myBars = data.data.data;
            let klines4800 = [...myBars, ...myBars];
            // if (klines4800.length < 320) {
            //   for (let i = 0; i < 320; i++) {
            //     klines4800 = [...klines4800, ...myBars];
            //   }
            // }
            const bars = klines4800.map((el: any) => ({
              time: el.time * 1000,
              low: parseFloat(el.low),
              high: parseFloat(el.high),
              open: parseFloat(el.open),
              close: parseFloat(el.close),
              volume: parseFloat(el.volume),
            }));
            if (first) {
              const lastBar = bars[bars.length - 1];
              history[symbolInfo.name] = { lastBar };
            }
            return bars;
          }
          this.hitted = false;
          return [];
        }
      );
    }
  },
};
