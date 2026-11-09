# 7mkennels.com

The site is `public/index.html`. Photos go in `public/images/`.

## The puppy list

Puppies are listed in `public/puppies.json`. While the list is empty, the page says photos and availability are coming soon. Each puppy looks like this:

```json
{
  "puppies": [
    { "name": "Cocoa", "sex": "Female", "status": "available", "photo": "images/cocoa.jpg", "note": "The smallest of the litter." }
  ]
}
```

- `status` is `available`, `reserved` or `sold`. A sold puppy stays on the page marked Sold; delete the entry to take it off.
- `photo` and `note` are optional.
