import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Category() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()
  console.log(params.categoryName)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(1)
          //pagination
        )
        //execute snapshot
        const querySnap = await getDocs(q)

        //error if only one data
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        //console.log(querySnap)
        let listings = []
        querySnap.forEach((doc) => {
          //console.log(doc.data())
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListing(listings)
        setLoading(false)
      } catch (error) {
        toast.error('could not fetch listings')
      }
    }
    fetchListings()
  }, [params.categoryName])

  //pagination / load more
  const onFetchMoreListings = async () => {
    try {
      //get refernce
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
        //pagination
      )
      //execute snapshot
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      //console.log(querySnap)
      let listings = []
      querySnap.forEach((doc) => {
        //console.log(doc.data())
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListing((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('could not fetch listings')
    }
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.categoryName === 'rent' ? 'place for rent' : 'place for sale'}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listing.map((listing) => (
                // <h3 key={listing.id}>{listing.data.name}</h3>
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>no listing for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category
