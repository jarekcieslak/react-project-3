import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet} from "react-native";
import {getDecks, setDummyData} from "../common/utils/api";
import DeckListItem from "./DeckListItem";
import NoData from "../common/noData/NoData";
import Loading from "../common/loading/Loading";
import Error from "../common/error/Error";
import {blue} from "../common/utils/colors";
import {Button} from "react-native-elements";

class DeckList extends Component {

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (payload) => {
            this.props.dispatch(getDecks());
        });
    }

    setTestData = () => {
        setDummyData();
        this.props.dispatch(getDecks());
    }


    render() {
        const {status, decks} = this.props;
        return (
            <ScrollView style={styles.container}>
                {status === 'error' && <Error></Error>}
                {status === 'loading' && <Loading></Loading>}
                {status === 'ok' && !!decks && decks.length === 0 && <NoData></NoData>}
                {status === 'ok' && !!decks && decks.map(item => <DeckListItem key={item.id} deck={item}/>)}
                <Button
                    style={{marginTop: 30}}
                    title="Set test data"
                    backgroundColor={blue}
                    onPress={this.setTestData}
                />
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: !!state.decks.data ? Object.values(state.decks.data) : [],
        status: state.decks.status
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default connect(mapStateToProps)(DeckList);
