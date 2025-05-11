import React, { Suspense } from 'react'
// import { AccountDetails } from '../componets/AccountDetails'
// import { GroupDetails } from '../componets/GroupDetails';
import { LoadingItems } from '@/components/loading/LoadingItems';
// import { Metadata } from 'next';
// import { getUserData } from '@/action/getUserData';
import { AccountContainer } from '../componets/AccountContainer';



// type PageProps = {
//   params: {
//     userId:string
//   }
//   searchParams: { 
//     chat:string
//   }
// }

//type AccountProsp=Pick<PageProps,'searchParams'>



// export  async function generateMetadata({params,searchParams}:PageProps):Promise<Metadata>{
  
//  const {userId}=params

//  const {chat}=searchParams


//   if(chat==='group'){

//    return {
//     title:"Group",
//     description:"Group Details",
   
//    }
//   }

//   const userData =await getUserData(userId)

//   if(!userData?._id || !userId){
     
//     return {
//       title:'Account',
//        description:"Account details"
//     }
//   }

//   return {
//     title:`${userData?.userName}`,
//     description:"Account details"
//   }

// }

//Remove-Item -Recurse -Force .next
const AcccountDetails =async () => {
 
  

  // const {chat} = searchParams

  return (
    <div className=' h-full flex justify-center p-5'>
    
      <Suspense fallback={<LoadingItems/>}>
        <AccountContainer/>
        {/* {chat=='group'?(<GroupDetails/>):(<AccountDetails/>)} */}
      </Suspense>
    </div>
  )
}

export default AcccountDetails