// @flow
import * as Types from '../../constants/types/chat2'
import * as Chat2Gen from '../../actions/chat2-gen'
import DeleteHistoryWarning from '.'
import {type RouteProps} from '../../route-tree/render-route'
import {compose, connect, type TypedState, type Dispatch} from '../../util/container'

type OwnProps = RouteProps<
  {
    conversationIDKey: Types.ConversationIDKey,
    teamname: string,
  },
  {}
>

const mapStateToProps = (state: TypedState, {routeProps}: OwnProps) => {
  const teamname = routeProps.get('teamname')
  return {
    teamname,
  }
}

const mapDispatchToProps = (dispatch: Dispatch, {navigateUp, routeProps}: OwnProps) => ({
  onBack: () => dispatch(navigateUp()),
  onClose: () => dispatch(navigateUp()),
  onDeleteHistory: () => {
    const conversationIDKey = routeProps.get('conversationIDKey')
    dispatch(navigateUp())
    dispatch(
      Chat2Gen.createMessageDeleteHistory({
        conversationIDKey: conversationIDKey,
      })
    )
  },
})

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  title: 'Delete message history',
})

export default compose(connect(mapStateToProps, mapDispatchToProps, mergeProps))(DeleteHistoryWarning)
