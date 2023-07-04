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

    <q-list >
      <!-- v-for (루프) 메소드를 통해 페이지에 데이터를 뿌려줌 -->
      <!-- 현재 date 를 key 로 -->
      <q-item class="q-py-md" v-for="twitter in twitters" :key="twitter.date">
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>New User !</strong>
            <span class="text-grey-7"> @새로운 사용자</span>
          </q-item-label>
          <q-item-label class="twitter-content text-body1">
            {{  twitter.content }}
          </q-item-label>

          <div class="tweet-icons row justify-between">
            <q-btn flat round size="sm" color="grey" icon="far fa-comment" />
            <q-btn flat round size="sm" color="grey" icon="fas fa-retweet" />
            <q-btn flat round size="sm" color="grey" icon="far fa-heart" />
            <q-btn flat round size="sm" color="grey" icon="fas fa-trash" />
          </div>          
        </q-item-section>

        <q-item-section side top>
          {{ twitter.date | relativeDate }}
        </q-item-section>
      </q-item>
    </q-list>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { formatDistance } from 'date-fns'

export default {
  name: 'PageHome',
  data() {
    return {
      newTwitterContent: '',
      twitters: [
        {
          content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem consectetur, culpa suscipit iure nostrum odio reprehenderit doloremque, at iusto minus expedita facilis molestiae, labore repudiandae tempore excepturi officiis obcaecati ex!',
          date: 1688484760117
        },
        {
          content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem consectetur, culpa suscipit iure nostrum odio reprehenderit doloremque, at iusto minus expedita facilis molestiae, labore repudiandae tempore excepturi officiis obcaecati ex!',
          date: 1688484937176
        }
      ]
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date())
    }
  },
}
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