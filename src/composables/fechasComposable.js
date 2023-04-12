
import moment from 'moment';
export function convertToDDMMYYYY(pFecha) {

    if (pFecha != null && pFecha != "")
      return moment(pFecha, "YYYY-MM-DDTHH:mm:ssZ").format("DD/MM/YYYY HH:mm:ss");
    return "";

}
