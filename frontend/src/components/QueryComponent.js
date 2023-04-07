import React from "react";


function QueryComponent() {
    return (
    <div>
    <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Ask Your Question</label>
          <textarea rows="10" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Question"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    );
}

export default QueryComponent;