import { doc, increment, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '../atoms/authModalAtoms';
import { Community, CommunitySnippet, communityState } from '../atoms/communitiesAtom';
import { auth, firestore } from '../firebase/clientApp';
import { getMySnippets } from '../helpers/firestore';


const useCommunityData= () => {
    
    const [user] = useAuthState(auth)
    const [ communityStateValue, setCommunityStateValue] = useRecoilState(communityState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const setAuthModalState = useSetRecoilState(authModalState)

    const getSnippets = async () => {
        setLoading(true)
        try {
            const snippets = await getMySnippets(user?.uid!);
            setCommunityStateValue((prev) => ({
            ...prev,
            mySnippets: snippets as CommunitySnippet[],
             }));
            setLoading(false);
        } catch (error: any) {
            console.log("Error getting user snippets",error)
            setError(error.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!user || !!communityStateValue.mySnippets.length) return;
    
        getSnippets();
      }, [user]);

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {

        if (!user) {
            setAuthModalState({ open: true, view: "login" })
            return
        }

        setLoading(true)
        if(isJoined) {
            leaveCommunity(communityData.id)
            return
        }
        joinCommunity(communityData)
    }
    const joinCommunity = async (communityData : Community) => {

        try {
            const batch = writeBatch(firestore)

            const newSnippet : CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || "",
            }

            batch.set(
                doc(
                  firestore,
                  `users/${user?.uid}/communitySnippets`,
                  communityData.id 
                ),
                newSnippet
              );
        
            batch.update(doc(firestore, "communities", communityData.id), {
                numberOfMembers: increment(1),
              });

            await batch.commit()

            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet]
            }))
        } catch (error: any){
            console.log("joinCommunity error", error)
            setError(error.message)
        }

        setLoading(false)
    }

    const leaveCommunity = async (communityId: string) => {

        try {
            const batch = writeBatch(firestore)

            batch.delete(
                doc(
                firestore,
                `users/${user?.uid}/communitySnippets`,
                communityId 
              ))

            batch.update(doc(firestore, "communities", communityId), {
                numberOfMembers: increment(-1),
              });

            await batch.commit()

            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                  (item) => item.communityId !== communityId
                ),
              }));
            
        } catch (error: any) {
            console.log("leaveCommunity error", error)
        }
    }
    return {
        communityStateValue,
        joinCommunity,
        leaveCommunity,
        onJoinOrLeaveCommunity,
        loading
    }
}
export default useCommunityData;