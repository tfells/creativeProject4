<template>
<div class="admin">
<h1 class="mid">Nice Notes Wall!</h1>
      <h2>Post a nice note to make the world a better place</h2>
    <div class="bulk">
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="To Whom?"><br>
	<textarea v-model="message" placeholder="Write you nice note here!"></textarea>
        <p></p>
        <button @click="send">Send the nice note!</button>
      </div>
    </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Post',
  data() {
    return {
      title: "",
      message: "",
      addItem: null,
    }
  },
  methods: {
    async send() {
      try {
        await axios.post('/api/note', {
          title: this.title,
          mess: this.message,
        });
        this.title = '';
        this.message = '';
      } catch {
        return false;
      }
    },
  },
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.bulk {
  display: flex;
  
}

.heading {
  float: center;
  display: block;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
  padding-right: 90px;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
.admin {
  display: block;
}
</style>

