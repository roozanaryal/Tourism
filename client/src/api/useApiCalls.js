
// export const useApiCalls = () => {
//   const callAPI = async (urlPath, methodType, body, options = {}) => {
//     const { skipAuth = false } = options;
//     if (!skipAuth) {
//       throw new Error("Auth token not found");
//     }
//     if (!methodType) {
//       throw new Error("Method type not found");
//     }
//     if (!urlPath) {
//       throw new Error("URL path not found");
//     }
//     try {
//         const response=await fetch(`${baseURL}/${urlPath}`,{
//             method:methodType,
//             headers:{
//                 "Content-Type":"application/json",
//             }
//         })
//     } catch (error) {
//       console.error("API call error");
//     }
//   };
// };
