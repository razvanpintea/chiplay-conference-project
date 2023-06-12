/**
 * UpdateAward component
 * 
 * Change awards of papers and pass the change via POST to the API
 * 
 * @author Razvan Cristian Pintea w20018875
 */
import './UpdateAward.css';


function UpdateAward(props) {

  /**
   * Send a POST request to the API, based on selected paper_id and award parameters 
   * Session must have a valid token active (user must be logged in)     
   */
  const handleSelect = (event) => {

    const formData = new FormData();
    formData.append('award', event.target.value);
    formData.append('paper_id', props.paper.paper_id);

    const token = localStorage.getItem('token');

    fetch("https://razwebdev.com/chiplay/api/update",
      {
        method: 'POST',
        headers: new Headers({ "Authorization": "Bearer " + token }),
        body: formData
      })
      .then(
        (response) => response.text()
      )
      .then(
        (json) => {
          console.log(json)
          props.handleUpdate()
        })
      .catch(
        (e) => {
          console.log(e.message)
        })
  }

  /**
   * Return paper's titles and their award
   * On changing the select value (the award),
   * the handleSelect function triggers
   *      
   */
  return (
    <div>
      <section class="main">
      <p><strong>{props.paper.title}</strong></p>
      <p>Has award: &nbsp;
        <select value={props.paper.award} onChange={handleSelect}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select></p>
      <br></br></section>
    </div>
  )
}
export default UpdateAward;