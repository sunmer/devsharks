import * as moment from "moment";

export function formatDate(date) {
  return moment(date).format("YYYY-MM-DD");
}