<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <!-- 문자열 카운터를 위한 newTwitterContent -->
      <div class="col">
        <q-input 
          class="new-tweet"
            bottom-slots 
            v-model="newTwitterContent" 
            label="What's happening?!" 
            counter 
            maxlength="280" 
            :dense="dense"
            autogrow
          >
            <template v-slot:before>
              <q-avatar>
                <img src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/43583/elephant-emoji-clipart-md.png">
              </q-avatar>
            </template>
        </q-input>
      </div>
      
      <div class="col col-shrink">
        <q-btn
          class="q-mb-lg"
          :disabled="!newTwitterContent"
          unelevated 
          rounded 
          color="primary" 
          label="Tweet"
          no-caps
         />
      </div>
    </div>

    <!-- 영역 구분 -->
    <q-separator 
      class="divider" 
      color="grey-2" 
      size="10px" 
    />

    <q-list class="q-py-md">
      <q-item clickable v-ripple>
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>New User !</strong>
            <span class="text-grey-7"> @새로운 사용자</span>
          </q-item-label>
          <q-item-label>
            <span class="text-weight-bold">Janet</span>
            <p class="tweet-content">I'll be in your neighborhood doing errands this
            weekend. Do you want to grab brunch?</p>

            <div class="tweet-icons row justify-between">
              <q-btn flat round size="sm" color="grey" icon="far fa-comment" />
              <q-btn flat round size="sm" color="grey" icon="fas fa-retweet" />
              <q-btn flat round size="sm" color="grey" icon="far fa-heart" />
              <q-btn flat round size="sm" color="grey" icon="fas fa-trash" />
            </div>
          
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newTwitterContent: ''
    }
  }
})
</script>

<style lang="sass">
.new-tweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.tweet-content
  padding-top: 5px

.tweet-icons
  margin-left: -5px
</style>