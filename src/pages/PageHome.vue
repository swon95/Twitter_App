<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <!-- 문자열 카운터를 위한 newQweetContent -->
      <div class="col">
        <q-input 
          class="new-qweet"
            bottom-slots 
            v-model="newQweetContent" 
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
        <!-- @click => 클릭이벤트 추가 -->
        <q-btn
          @click="addNewQweet"
          class="q-mb-lg"
          :disabled="!newQweetContent"
          unelevated 
          rounded 
          color="primary" 
          label="Qweet"
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
      <q-item
       class="q-py-md" 
       v-for="qweet in qweets" 
       :key="qweet.date"
       >
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
          <q-item-label class="qweet-content text-body1">
            {{ qweet.content }}
          </q-item-label>

          <div class="qweet-icons row justify-between">
            <q-btn flat round size="sm" color="grey" icon="far fa-comment" />
            <q-btn flat round size="sm" color="grey" icon="fas fa-retweet" />
            <q-btn flat round size="sm" color="grey" icon="far fa-heart" />
            <q-btn @click="deleteQweet(qweet)" flat round size="sm" color="grey" icon="fas fa-trash" />
          </div>          
        </q-item-section>

        <q-item-section side top>
          {{ qweet.date | relativeDate }}
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
      newQweetContent: '',
      qweets: [
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
  // 새로운 게시글(Tweet) 추가
  methods: {
    addNewQweet() {
      // console.log('a')
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now()
      }
      this.qweets.unshift(newQweet) // push, unshift
    },
    deleteQweet(qweet) {
      // console.log('Delete Tweet: ', qweet)
      // 글이 작성된 시간을 기준으로
      const dateToDelete = qweet.date
      // 몇번째 인덱스인지 배열에서 탐색
      const index = this.qweets.findIndex(qweet => qweet.date === dateToDelete)
      // console.log('index : ', index)
      // splice 함수를 사용하여 배열에서 1개 제거
      this.qweets.splice(index, 1)
    }  
  }
}
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.qweet-content
  padding-top: 5px

.qweet-icons
  margin-left: -5px
</style>