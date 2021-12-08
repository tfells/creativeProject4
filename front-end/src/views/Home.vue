<template>
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="note in notes" :key="note.id">
      <h2>To: {{note.title}}</h2>
      <hr>
      <h4>{{note.message}}</h4>
      <button @click="receive(note)">Receive</button>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     notes: [],
    }
  },
  created() {
    this.getNotes();
  },
  methods: {
    async receive(note) {
      try {
        await axios.delete("api/delete/" + note._id);
        this.getNotes();
      } catch (error) {
        return false;
      }
    },
    async getNotes() {
      try {
        let response = await axios.get("/api/notes");
        this.notes = response.data;
        return true;
      } catch (error) {
        return false;
      }
    },
  },
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  border: 5px solid red;
  display: inline-block;
  width: 300px;
  height: 200px;
  padding-left: 10px;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
