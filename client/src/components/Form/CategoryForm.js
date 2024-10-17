import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Category"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />

          <button type="submit" className="btn btn-primary mt-3">submit</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
