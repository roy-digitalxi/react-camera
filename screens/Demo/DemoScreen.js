import React, { Component } from 'react';
import {
    View,
    Dimensions,
    TouchableHighlight,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

// Libraries
import Camera from 'react-native-camera';
import * as Progress from 'react-native-progress';

// redux
import { connect } from 'react-redux';

// native base
import {
    Icon
} from 'native-base';

// const url = 'http://0.0.0.0:5000';
const url = 'http://159.89.122.32:5000';

class DemoScreen extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            path: null,
            predictions: []
        };
    }

    takePicture() {
        this.camera.capture()
            .then((data) => {
                this.setState({ path: data.path })
            })
            .catch(err => console.error('take photo error: ', err));
    }

    renderCamera() {
        return (
            <Camera
                ref={(cam) => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                captureTarget={Camera.constants.CaptureTarget.disk}
            >
                <TouchableHighlight
                    style={styles.capture}
                    onPress={this.takePicture.bind(this)}
                    underlayColor="rgba(255, 255, 255, 0.5)"
                >
                    <View />
                </TouchableHighlight>
            </Camera>
        );
    }

    handleSearchImg = () => {
        let base64Img = this.state.path;
        const data = new FormData();
        data.append('file', {
            uri: base64Img,
            type: 'image/jpeg',
            name: 'testPhotoName'
        });
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            })
            .then((response) => response.json())
            .then((responseData) => {
                let { predictions } = responseData;
                if (predictions) {
                    this.setState({
                        stage: 1,
                        predictions: predictions
                    })
                } else {
                    alert("Sorry! we don't find any match");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    renderImage() {
        return (
            <View>
                <Image
                    source={{ uri: this.state.path }}
                    style={styles.preview}
                />
                <TouchableOpacity
                    onPress={() => this.handleSearchImg()}
                    style={styles.confirm}
                >
                    <View style={styles.iconWrapper}>
                        <Icon
                            style={styles.confirmIcon}
                            name="ios-checkmark"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.setState({ path: null })}
                    style={styles.cancel}
                >
                    <View style={styles.iconWrapper}>
                        <Icon
                            style={styles.cancelIcon}
                            name="ios-undo" />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderProgress = (prediction, index) => {

        let color = '#000'
        switch (index) {
            case 0:
                color = '#60ACB0';
                break;
            case 1:
                color = '#070B36';
                break;
            case 2:
                color = '#61446F';
                break;
            case 3:
                color = '#5A91DC';
                break;
            case 4:
                color = '#50566C';
                break;
            default:
                break;
        }

        return (
            <View
                key={index}
                style={styles.dataContainer}>
                <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 6, color }}>{prediction.description}</Text>
                <View style={styles.dataWrapper}>
                    <View style={styles.progress}>
                        <Progress.Bar
                            color={color}
                            borderColor="#F1F7FE"
                            progress={Number((prediction.probability / 100).toFixed(2))}
                            width={Dimensions.get('window').width - 120}
                            height={12}
                            borderRadius={6}
                            style={Object.assign({}, styles.progress, { backgroundColor: "#F1F7FE" })}
                        />
                    </View>
                    <View style={styles.percentage}>
                        <Text style={{ fontSize: 12, fontWeight: "600", color }}>{prediction.probability.toFixed(2)}%</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {

        const {
            stage,
            path,
            predictions,
        } = this.state;

        return (
            stage === 0 ?
                (
                    <View style={styles.container}>
                        {path ? this.renderImage() : this.renderCamera()}
                    </View>
                )
                :
                (
                    <View style={styles.resPageContainer}>
                        <View style={styles.resPage}>

                            <View style={styles.bannerContainer}>

                                <View style={styles.bannerLabelContainer}>
                                    <Text style={styles.bannerLabel}>Canada's First Artifical Intelligence Dog Breed Finder</Text>
                                </View>
                                <View style={styles.thumbnailContainer}>
                                    <Image
                                        source={{ uri: this.state.path }}
                                        style={styles.thumbnail}
                                    />
                                </View>

                            </View>

                            <ScrollView>
                                <View style={styles.contentContainer}>
                                    {
                                        predictions ?
                                            predictions.map((prediction, index) => (
                                                this.renderProgress(prediction, index)
                                            ))
                                            :
                                            null
                                    }
                                </View>
                            </ScrollView>

                        </View>

                        <View style={styles.backContainer}>
                            <TouchableOpacity
                                style={styles.backWrapper}
                                onPress={() => this.setState({ stage: 0, path: null, predictions: [] })}
                            >
                                <Text style={styles.back}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
        )
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#FFF',
        marginBottom: 15,
    },
    confirm: {
        position: 'absolute',
        right: 60,
        bottom: 72,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        height: 72,
        width: 72,
        borderRadius: 72
    },
    cancel: {
        position: 'absolute',
        left: 60,
        bottom: 72,
        backgroundColor: 'rgba(222, 222, 222, 0.9)',
        height: 72,
        width: 72,
        borderRadius: 72
    },
    iconWrapper: {
        position: 'relative',
        height: 72,
        width: 72,
        borderRadius: 72,
    },
    confirmIcon: {
        position: 'absolute',
        left: 24,
        top: 9,
        color: '#53B089',
        fontSize: 54
    },
    cancelIcon: {
        position: 'absolute',
        left: 20,
        top: 18,
        color: '#000000',
        fontSize: 36
    },

    resPageContainer: {
        position: 'relative',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'white'
    },
    resPage: {
        height: Dimensions.get('window').height - 60,
        width: Dimensions.get('window').width,
    },
    bannerContainer: {
        height: 180,
        width: Dimensions.get('window').width,
        backgroundColor: '#69BBC0',
    },
    bannerLabelContainer: {
        paddingTop: 36,
        paddingLeft: 24,
        paddingRight: 24,
    },
    bannerLabel: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    thumbnailContainer: {
        marginTop: 110,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnail: {
        height: 180,
        width: 180,
        borderRadius: 12
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 120
    },
    dataContainer: {
        marginBottom: 12
    },
    dataWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    progress: {
        width: Dimensions.get('window').width - 120,
    },
    percentage: {
        width: 72,
        paddingLeft: 12
    },


    backContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 60,
        width: Dimensions.get('window').width,
        backgroundColor: '#F1F7FE'
    },
    backWrapper: {
        height: 60,
        width: Dimensions.get('window').width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back: {
        fontSize: 18
    },


};

const stateToProps = (state) => {
    return {

    }
}

const dispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(stateToProps, dispatchToProps)(DemoScreen);