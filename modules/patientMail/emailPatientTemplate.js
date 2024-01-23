export const emailResTemplate = (lp, name, phone, date, email, treatment, subject, message, image) => {
  return `
    <table>
    <thead>
      <tr>
      <td  style="padding-left: 20px;"><strong>Dil</strong></td>

        <td  style="padding-left: 20px;"><strong>İsim</strong></td>
        <td  style="padding-left: 20px;"><strong>Telefon</strong></td>
        <td  style="padding-left: 20px;"><strong>Mail</strong></td>
        <td  style="padding-left: 20px;"><strong>Tarih</strong></td>
       <td  style="padding-left: 20px;"><strong>Tedavi</strong></td>
       <td  style="padding-left: 20px;"><strong>Konu</strong></td>
       <td  style="padding-left: 20px;"><strong>Mesaj</strong></td>
       <td  style="padding-left: 20px;"><strong>Resim</strong></td>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td  style="padding-left: 20px;">${lp}</td>

        <td  style="padding-left: 20px;">${name}</td>
        <td  style="padding-left: 20px;">${phone}</td>
        <td  style="padding-left: 20px;">${email}</td>
        <td  style="padding-left: 20px;">${date}</td>
        <td  style="padding-left: 20px;">${treatment}</td>
        <td  style="padding-left: 20px;">${subject}</td>
        <td  style="padding-left: 20px;">${message}</td>
        <td  style="padding-left: 20px;">${image}</td>
      </tr>
    </tbody>
  </table>
  `
}
export default emailResTemplate