<template>
  <div class="">
    <div class="fw-bold fs-3">Edit Product</div>
    <form class="mx-3" v-on:submit.prevent="() => {}">
      <div class="row mt-2">
        <div class="col-5 mb-2">
          <label class="form-label" for="exampleUsername">Product brand</label>

          <select v-model="product.brand" class="form-select col-5">
            <option :value="i" v-for="i in this.brands">
              {{ i }}
            </option>
          </select>
        </div>
        <div class="col-7 mb-2">
          <label for="exampleInputEmail" class="form-label">Product name</label>
          <input
            type="text"
            class="form-control"
            v-model="product.name"
            placeholder="Jordan 1 Dark Mocha"
          />
        </div>
      </div>

      <div class="col-12 mb-2">
        <label for="exampleInputEmail" class="form-label"
          >Product description</label
        >
        <input
          type="text"
          class="form-control"
          v-model="product.description"
          maxlength="320"
          placeholder="This is a great shoe, released in 2019 ..."
        />
      </div>
      <div class="row mb-2">
        <div class="col-6">
          <label for="exampleInputEmail" class="form-label"
            >Product price</label
          >
          <input
            type="text"
            class="form-control"
            v-model="product.price"
            placeholder="100.00"
          />
        </div>
        <div class="col-6">
          <label for="exampleInputEmail" class="form-label"
            >Product weight</label
          >
          <input
            type="text"
            class="form-control"
            v-model="product.weight"
            placeholder="0.7"
          />
        </div>
      </div>
      <div class="col-5">
        <label class="form-label" for="exampleUsername"
        >Product Category</label
        >

        <select
            v-model="productCategory"
            class="form-select col-5"
            @click="addCategory"
        >
          <option :value="category" v-for="category in categories">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="" id="divTable">
        <table class="table table-light table-striped mt-5 text-center">
          <thead class="">
          <tr>
            <th>Category</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="cat in product.categories" :key="cat">
            <td>{{ cat.name }}</td>
            <td>
              <button
                  v-on:click="removeSelectedCategory(cat.id)"
                  class="btn addFormButton mx-auto"
              >-
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </form>
    <button
      @click="handleSubmit()"
      class="btn btn-sm editFormButton text-light mx-3 mt-2"
    >
      Submit
    </button>
    <button
      @click="$emit('close')"
      class="btn btn-sm editFormButton text-light mt-2"
    >
      Close
    </button>
  </div>
</template>

<script>
import {Network} from "../../helpers/network";
import {SweetAlert} from "../../helpers/sweetAlert";
import {toRaw} from "vue";

export default {
  props: ["product_id"],
  data() {
    return {
      product: Object,
      brands: Object,
      categories: [],
      productCategory: "",
    };
  },
  methods: {
    async loadProduct() {
      Network.getProduct(localStorage.getItem("token"), this.product_id).then(result => {
        this.product = result;
      }).catch((err) => {
        console.log("err", err.response.data);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
    },

    async handleSubmit() {
      Network.editProduct(localStorage.getItem("token"), this.product_id, this.product).then(() => {
        SweetAlert.accepted(this.$swal, "products has been updated!")
        this.$emit('close')
      }).catch((err) => {
        console.log(err.response.data.message);
        SweetAlert.error(this.$swal, err.response.data.message)
      });
    },

    fetchCategories() {
      Network.getCategories().then(result => {
        this.categories = result;
      }).catch((err) => console.log("err", err.response.data));
    },

    addCategory() {
      if (this.productCategory !== "") {
        const set = new Set(toRaw(this.product.categories));
        set.add(toRaw(this.productCategory));
        this.product.categories = Array.from(toRaw(set));
        this.productCategory = ""
      }
    },

    removeSelectedCategory(id) {
      this.product.categories = this.product.categories.filter(category => category.id !== id);
    }
  },

  mounted() {
    this.brands = JSON.parse(localStorage.getItem("brands"));
    this.loadProduct();
    this.fetchCategories();
  },
};
</script>

<style>
.editFormButton {
  background: #48acf0;
  color: #f7f7f7;
}
.editFormButton:hover {
  background: #3294d6;
  color: #f7f7f7;
}
</style>
