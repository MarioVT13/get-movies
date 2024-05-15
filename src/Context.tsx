import React from "react";

const initialState = {
  helloMessageSeen: false,
};

const contextWrapper = (component?: React.Component) => ({
  ...initialState,

  setHelloMessageSeen: (isSeen: boolean) => {
    initialState.helloMessageSeen = isSeen;
    component?.setState({ context: contextWrapper(component) });
  },
});

type Context = ReturnType<typeof contextWrapper>;

export const Context = React.createContext<Context>(contextWrapper());

interface State {
  context: Context;
}

export class ContextProvider extends React.Component<{ state: State } | any> {
  state: State = {
    context: contextWrapper(this),
  };

  render() {
    return (
      <Context.Provider value={this.state.context}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
