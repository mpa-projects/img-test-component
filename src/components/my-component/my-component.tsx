import { Component, Prop, h, State } from "@stencil/core";
import { Product, ResultItem, Category } from "../../utils/utils";

@Component({
  tag: "my-component",
  styleUrl: "my-component.scss",
  shadow: true,
})
export class MyComponent {
  @Prop() categoryUrl: string;
  @Prop() productUrl: string;

  @State() value: string;
  @State() category: Array<Category>;
  @State() itemsArray: Array<Product> = [];
  @State() showMe: boolean = false;
  @State() showCategory: boolean = true;

  componentWillLoad() {
    if (this.showCategory) {
      this.getCategory();
      this.showCategory = false;
    }
  }

  getCategory() {
    fetch(this.categoryUrl)
      .then((response: Response) => response.json())
      .then((response) => {
        this.category = [...response];
      });
  }

  componentDidUpdate() {
    if (this.showMe == true) {
      return;
    } else if (this.itemsArray.length > 0) {
      this.showMe = true;
    }
  }

  componentDidUnload() {
    this.showMe = false;
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  resetSearch(e) {
    e.preventDefault();
    this.value = "";
    this.category = [];
    this.itemsArray = [];
    this.showMe = false;
    if (!this.showCategory) {
      this.getCategory();
    }
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    let categoryNameProp;
    const words = this.value !== undefined ? this.value.split(" ") : null;
    if (code === 32 && this.itemsArray.length == 0) {
      //13 is the enter keycode
      alert(this.value);

      categoryNameProp = this.category.find((el) => el.name == words[0]);
      if (categoryNameProp !== undefined && words[1] !== undefined) {
        if (this.itemsArray.length == 0) {
          fetch(`${this.productUrl}${words[1]}`)
            .then((response: Response) => response.json())
            .then((response) => {
              this.itemsArray = response.filter(
                (el) => el.categoy == categoryNameProp.name
              );
            });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <form style={{ width: "1000px" }}>
          <button
            style={{
              marginLeft: "10px",
              cursor: "auto",
              position: "absolute",
              top: "45px",
            }}
            type="disabled"
          >
            <img
              style={{ height: "27px", width: "27px" }}
              src={
                "https://aca5.accela.com/bcc/app_themes/Default/assets/gsearch_disabled.png"
              }
            />
          </button>
          <input
            type="text"
            value={this.value}
            onInput={(event) => this.handleChange(event)}
            onKeyPress={(event) => this.enterPressed(event)}
          />
          {this.value ? (
            <button onClick={(e) => this.resetSearch(e)}>
              <img
                style={{ height: "21px", width: "15px" }}
                src={
                  "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI5OC42NjcgMjk4LjY2NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjk4LjY2NyAyOTguNjY3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cG9seWdvbiBwb2ludHM9IjI5OC42NjcsMzAuMTg3IDI2OC40OCwwIDE0OS4zMzMsMTE5LjE0NyAzMC4xODcsMCAwLDMwLjE4NyAxMTkuMTQ3LDE0OS4zMzMgMCwyNjguNDggMzAuMTg3LDI5OC42NjcgICAgIDE0OS4zMzMsMTc5LjUyIDI2OC40OCwyOTguNjY3IDI5OC42NjcsMjY4LjQ4IDE3OS41MiwxNDkuMzMzICAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
                }
              />
            </button>
          ) : null}

          <div class={this.showMe ? "card-container" : "none"}>
            {this.showMe
              ? this.itemsArray.map((el: ResultItem) => (
                  <div class="card" title="Click to download">
                    <img
                      style={{ height: "150px", borderRadius: "5px" }}
                      src={el.imageUrl}
                      alt="broken img"
                    />
                    <p>
                      {el.title} <br />
                      <br />
                      #fakeTag #fakeTag
                    </p>
                  </div>
                ))
              : null}
          </div>
        </form>
      </div>
    );
  }
}
