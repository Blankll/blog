<template>
  <div>
    <mu-list toggle-nested>
      <mu-list-item button :ripple="false" nested :open="open === 'send'" @toggle-nested="open = arguments[0] ? 'send' : ''">
        <mu-list-item-action>
          <mu-icon value="send"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>articles</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
        </mu-list-item-action>
        <mu-list-item button :ripple="false" slot="nested" to="/admin/article">
          <mu-list-item-title>list</mu-list-item-title>
        </mu-list-item>
      </mu-list-item>
      <mu-list-item button :ripple="false" nested :open="open === 'drafts'" @toggle-nested="open = arguments[0] ? 'drafts' : ''">
        <mu-list-item-action>
          <mu-icon value="drafts"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Tags</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
        </mu-list-item-action>
        <mu-list-item button :ripple="false" slot="nested" to="/admin/tag">
          <mu-list-item-title>list</mu-list-item-title>
        </mu-list-item>
      </mu-list-item>
      <mu-list-item button :ripple="false" nested :open="open === 'inbox'" @toggle-nested="open = arguments[0] ? 'inbox' : ''">
        <mu-list-item-action>
          <mu-icon value="inbox"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>users</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
        </mu-list-item-action>
        <mu-list-item button :ripple="false" slot="nested" to="/admin/user">
          <mu-list-item-title>list</mu-list-item-title>
        </mu-list-item>
      </mu-list-item>
      <mu-list-item button :ripple="false" nested :open="open === 'stared'" @toggle-nested="open = arguments[0] ? 'stared' : ''">
        <mu-list-item-action>
          <mu-icon value="grade"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>admins</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
        </mu-list-item-action>
        <mu-list-item button :ripple="false" slot="nested">
          <mu-list-item-title>list</mu-list-item-title>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
  </div>
</template>
<script>
export default {
  name: 'AdminHomeLeft',
  data () {
    return {
      open: ''
    }
  }
}
</script>
