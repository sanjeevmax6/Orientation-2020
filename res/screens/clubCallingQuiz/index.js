import { autoAction } from 'mobx/dist/internal';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image
} from 'react-native';


const Timetable = ({navigation}) => {
  let questions = [
		{ question:'Are you a techie?' , ansYes:'Yes, a snake is not the first thing I think of when you say python' , ansNo:'No, by codes you mean Barcodes right?'},
		{ question:'Do you have what it takes to be the next Mukesh Ambani or Warren Buffet? Or do you aspire to build your own empire and be a household name? ' , ansYes:'Oh yes! I can already see myself giving exclusive interviews in biz mags' , ansNo:'Eww no I do not subscribe to capitalism 🤡'},
		{ question:'Have you been scolded one too many times for doodling on your class benches. Or do you pay attention to details that others might have easily missed and love capturing it through your lens? ' , ansYes:'Ooh yeahhh that totally seems like my forté! 😋' , ansNo:'Do NOT remind me of the D I got in drawing and photography classes 🥲'},
		{ question:'Are you someone who love to pour your heart into work if it were for upliftment?' , ansYes:"Yes, that’s the coolest thing" , ansNo:'No, this is not my calling'},
		{ question:'Wanna show off your literary skills?', ansYes:'Oh yes! My way with words is incomparable' , ansNo:"No, wordplays and classics aren’t really my arena"},
		{ question:'Does the thought of making a fest come to life excite you? Do you enjoy working with diverse groups of people to put together a huge project? ' , ansYes:"Yaay it's so exciting " , ansNo:"Umm..I'm more of a person who enjoys watching it happen"},
		{ question:' Did fancy dress competitions excite you as a kid? Are you someone who enjoys cultural activities? ' , ansYes:"It's interesting" , ansNo:"It's not my cup of tea"},
		{ question:'Do you enjoy the rush of adrenaline when speaking in front of a crowd or wish to be a fearless speaker ? Are discussions and debates your type of pastime?' , ansYes:'It is the best!' , ansNo:"I’m more of a low-key person"},
		{ question:' Are you looking for something else entirely than the above clubs? Fret not, we got you covered.' , ansYes:'yes' , ansNo:'no'},
		{ question:'Are you looking for clubs from within your haven? ' , ansYes:'yes' , ansNo:'no'}
	]
	let clubs = [
		["Spider software", "delta", "RMI" ,"DC", "Spider Hardware", "3D", "PSI", "EVER", "SCient"],
		["180DC", "Ecell", "ProfNITT", "Sigma"],
		["Graphique","pixelbug"],
		["Student council", "omega", "social council" , "taskforce", "surge", "ignite", "prakruti", "akkara", "apeksha" , "tedX" , "leap"],
		["Aayam","akshara","tamil mandram","balls by picasso","feeds"],
		["Pragyan","Festember","Sportsfete","aaveg","nittfest"],
		["Music Troupe","Dance Troupe", "Thespians", "FSOC", "Amruthavarshini", "fine arts"],
		["Toastmasters" , "athenaeum"],
		["Office of international relations (OIR)", "Maximus"," nakshatra"," freudian paradox"],
		["Symposiums"]
	]
  const [questionNum, setQuestionNum] = useState(0);
  const [clubsView, setClubsView] = useState(false);
  const [currentSel, setCurrentSel] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if(currentSel == 1){ //yes
        setClubsView(true)
		setCurrentSel(0)
      }else if(currentSel == -1){ //no
        setQuestionNum(num => num+1)
		setCurrentSel(0)
      }
    }, 100);
    return () => clearInterval(interval);
	}, [currentSel]);


  return (
    <View>
      {clubsView == false && questions.map((question,i)=>(
				(i==questionNum &&
					<View>
						<Text style={styles.questionNumberText}>
							Question {i+1}
						</Text>
						<View style={styles.questionNumberLine}></View>
						<Text style={styles.question}>
							{question.question}
						</Text>
						<Pressable onPress={()=>{setCurrentSel(1)}} style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(255, 103, 0, 0.5)' : 'white' }, styles.answerOutline ]}>
						<Text style={{fontSize:15, textAlign:'center'}}>
								{question.ansYes}
							</Text> 
						</Pressable>
						<Pressable onPress={()=>{setCurrentSel(-1)}} style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(255, 103, 0, 0.5)' : 'white' }, styles.answerOutline ]}>
							<Text style={{fontSize:15, textAlign:'center'}}>
								{question.ansNo}
							</Text> 
						</Pressable>
					</View>

				)
			))}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.clubView}>
        {clubsView==true && 
            clubs[questionNum].map((text,i)=>(
              <View key={i}>
                <Text style={styles.clubName}>
                  {text}
                </Text>
                <View style={styles.clubLine}></View>
              </View>
         
            ))
        }
      </ScrollView>

  	</View>
            
  );
};

const styles = StyleSheet.create({
	questionNumberText: {
		color:'#7A7A7A',
		fontSize:30,
		fontWeight:'700',
		paddingTop:30,
		marginLeft:10,
	},
	questionNumberLine: {
		height:1,
		width:200,
		backgroundColor:'#7A7A7A',
		marginLeft:10,
	},
	question: {
		fontSize:20,
    fontWeight:'700',
    marginTop:35,
    marginLeft:10,
	},
  answerOutline: {
    width:'80%',
    marginLeft:'10%',
    borderRadius:20,
    borderColor:"#FF6700",
    borderWidth:1,
    padding:20,
    marginTop:40,
  },
  clubOutline: {
    width:'80%',
    marginLeft:'10%',
    borderRadius:20,
    borderColor:"#FF6700",
    borderWidth:1,
    padding:20,
    marginTop:20,
    backgroundColor:'rgba(255, 103, 0, 0.2)',
    fontWeight:'700'
  },
  clubView: {
    padding:10,
  },
  clubName: {
		fontSize:20,
		fontWeight:'400',
		paddingTop:30,
		marginLeft:'5%',
	},
	clubLine: {
		height:1,
		width:'90%',
		backgroundColor:'#7A7A7A',
		marginLeft:'5%',
    marginTop:10,
	},
})

export default Timetable;
