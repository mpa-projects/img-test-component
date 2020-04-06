import { Component, Prop, h, State, getAssetPath } from "@stencil/core";

@Component({
  tag: "my-component",
  styleUrl: "my-component.scss",
  shadow: true,
})
export class MyComponent {
  @Prop() xImage: string;
  @Prop() sImage: string;

  @Prop() first: string;
  @Prop() last: string;
  @State() value: string;
  @State() category: Array<any>;
  @State() itemsArray: Array<any> = [];
  @State() showMe: boolean = false;
  @State() showCategory: boolean = true;

  @State() itemsDisplayArray: Array<any> = [];

  componentWillLoad() {
    if (this.showCategory) {
      this.getCategory();
      this.showCategory = false;
    }
  }

  getCategory() {
    fetch(this.first)
      .then((response: Response) => response.json())
      .then((response) => {
        this.category = [...response];
        console.log(response);
        console.log(this.category);
      });
  }

  componentDidUpdate() {
    if (this.showMe == true) {
      console.log("showme je tru i samo vraca");
      return;
    } else if (this.itemsArray.length > 0) {
      console.log("showme je false i setujemo na tru");
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
          fetch(`${this.last}${words[1]}`)
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
          <button class="search" onClick={(e) => this.resetSearch(e)}>
            <img src={this.sImage} />
          </button>
          <input
            type="text"
            id="icon"
            style={{
              margin: "0 auto",
            }}
            value={this.value}
            onInput={(event) => this.handleChange(event)}
            onKeyPress={(event) => this.enterPressed(event)}
          />
          {this.value ? (
            <button onClick={(e) => this.resetSearch(e)}>
              <img src={getAssetPath("./assets/times.png")} />
            </button>
          ) : null}

          {this.showMe
            ? this.itemsArray.map((el) => (
                <div>
                  {el.title} {el.imageUrl}
                </div>
              ))
            : null}
        </form>
      </div>
    );
  }
}

// todo
// pokupiti vrednosti iz searcha
// ubaciti x da resetuje vrednost
//difoltna vrednost ako nema
//da prima tip kroz input
//da ga jebes za ono tags

// TODO:
{
  /** 

-prvo stavi filter da poredi prvu vrednost koju ukucas TOYS
  -ako je isto opalis rikvest
  -ako ne izbaci neku gresku **smisli da iskace neki tooltip**

-ako dodje do drugog searcha
  -pamti se sta je ukucao i radi se filter
    -ako ima u kategoriji pr-TOYS ta rec
      -vrati carticu
  -ako nema rec izbaci could not be found


-potrudi se da osim linka koji ce biti zasebni prop da ostalo stavis u objekat-tipove i stilove neke

--ako ostane vremena vidi za tags..da li je to recimo reci koje se vezuju za title

--css ce biti zeznut bez obzira sto izgleda lagano..ali bez odustajanja!

*/
}
