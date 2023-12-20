import React from "react";

class CategoryFilter {
  render() {
    return (
      <div>
        {this.props.fileterdList.map((filter, index) => {
          <div key={index}>{filter}</div>;
        })}
      </div>
    );
  }
}

export default CategoryFilter;
