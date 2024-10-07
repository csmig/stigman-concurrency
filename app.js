import { auth, resourceTiming, OpenApiOps } from '@nuwcdivnpt/stig-manager-dev-modules'

const definition = await(await fetch(`http://localhost:64001/api/op/definition`)).json()
const oas = new OpenApiOps({ definition })

{
  const url = oas.getUrl('postReviewsByAsset', {
    collectionId: 1,
    assetId: 62
  })
  const username = 'admin'
  const token = await auth.getAccessToken({ username })
  const reviews = [
    {
      ruleId: 'SV-106187r1_rule',
      result: 'pass',
      detail: 'test',
      comment: 'test'
    }
  ] 
  const timings = await resourceTiming.getResourceTiming({
    url,
    token,
    method: 'post',
    body: JSON.stringify(reviews),
    concurrent: 2
  })
  for (const time of timings) {
    console.log(`${time.name}: ${time.responseStart - time.requestStart}`)
  }
}
