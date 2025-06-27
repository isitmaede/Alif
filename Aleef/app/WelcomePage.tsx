import { StyleSheet, Text, View , SafeAreaView , StatusBar , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import {moderateScale , verticalScale , scale} from '@/utils/metrics' 
import Colors from '@/components/colors'
import { useRouter } from 'expo-router'

export default function WelcomePage() {
    const router = useRouter()
    const handleRouting = () => {
    router.push('/(tabs)/home')
    }
  return (
    <View style={styles.container}>
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.mainTitle}>Alif</Text>
            </View>
            
        <View style={styles.center}>
            <Text style={styles.title}>Every soul matters, let's start with kindness.</Text>
            <Image
            source={require('@/assets/images/cadog.png')}
            style={styles.cartoon}
            />
            
        </View>
        <TouchableOpacity style={styles.backgroundBtn} onPress={handleRouting}>
            <Text style={styles.btn}>Start the Journey</Text>
        </TouchableOpacity>
        </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        flex:1,
        backgroundColor:Colors.background
        
    },
    cartoon:{
        width:scale(340),
        height:verticalScale(340),
        justifyContent:'center',
        alignSelf:"center",

    },
    title:{
        color:Colors.text,
        fontSize:24,
        textAlign:"center",
        fontFamily:"tajawal-bold"
    },
    header:{
        justifyContent:"center",
        alignSelf:"center",
        bottom:scale(90),
        
    },
    mainTitle:{
        color:Colors.success,
        fontSize:moderateScale(40),
        fontFamily:"tajawal-bold",
        
    },
    backgroundBtn:{
        alignSelf:'center',
        top:scale(40),
        

    },
    center:{
        bottom:scale(10)
    },
    btn:{
        backgroundColor:Colors.success,
        paddingHorizontal:scale(50),
        paddingVertical:25,
        fontFamily:"tajawal-bold",
        color:"white",
        borderBottomLeftRadius:22,
        borderTopRightRadius:22,
        fontSize:27
    }
})