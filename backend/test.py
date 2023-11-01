def rotate(nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: None Do not return anything, modify nums in-place instead.
        """
        for i in range(k):
            shifted = nums[-1]
            nums[1:] = nums[0:-1]
            nums[0] = shifted
        return shifted

if __name__=='__main__':
    print(rotate([1, 2, 3, 4], 2))